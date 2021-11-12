import { CSVLink } from 'react-csv'

import { useState, useEffect, useCallback } from 'react'
import throttle from "lodash/throttle";
import LazyLoader from "../../components/LazyLoader/LazyLoader";
import ScrollContainer from '../../components/LazyLoader/ScrollContainer';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { DashBoardHeader } from '../../components/DashBoardHeader/DashBoardHeader'
import { TableHead } from '../../components/TableHead/TableHead'
import { TableRow } from '../../components/TableRow/TableRow'
import { CircleLoader } from '../../components/Loader/CircleLoader';
import { RockerSvg } from '../../svg_elements/RockerSvg';
import classes from './TablePage.scss'
// const datatoExportCsv={
    
// }
// const headers = [
//     { label: 'Conjunction ID', key: 'conjunctionId' },
//     { label: 'Created', key: 'created' },
//     { label: 'TCA', key: 'tca' },
//     { label: 'CollisionProbability', key: 'collisionProbability' },
//     { label: 'Miss Distance', key: 'missDistance' },
//     { label: 'Chaser', key: 'chaser' },
//     { label: 'Target', key: 'target' },
//     { label: 'classification', key: 'classification' },
//   ];


const defaultAllSatellites = [
    {
        name: '',
        isGuarded : false,
        risk: ''
    }
]




export const TablePage = ({tableData, setIsAuthenticated }) => {
    
    let firstQueryParam = 0 ;
    let secondQueryParam = 29 ;
    
    const [showLoader, setShowLoader] = useState(true)
    const [showSmallLoader, setShowSmallLoader] = useState(false)

    const [ stopAppendItems, setStopAppendItems ] = useState(false)

    const [ csvData, setCsvData ] = useState(null);
    const [ headersData, setHeadersData ] = useState(null);
    
    const [ allSatellites, setAllSatellites] = useState(defaultAllSatellites) 
    const [ tableDataState, setTableDataState  ] = useState([] ) //items
    const [ activeSatellite, setActiveSatellite ] = useState()

    const [ sortByCreated, setSortByCreated ] = useState(false)
    const [ toggleSortCreated, setToggleSortCreated ] = useState(null)
    
    const [ sortByTca, setSortByTca ] = useState(false)
    const [ toggleSortTca, setToggleSortTca ] = useState(null)

    const [ sortByColProb, setSortByColProb ] = useState(false)
    const [ toggleSortColProb, setToggleSortColProb ] = useState(null)


    const [ sortByMissDis, setSortByMissDis ] = useState(false)
    const [ toggleSortMissDis, setToggleSortMissDis ] = useState(null)

    useEffect(() => {
        setShowLoader(true)
          fetch('/api/dashboard/allSatellite', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            // console.log('dataFromAll: ', json.data.allSatellites);
            if (!(json.data.length === 0) )setAllSatellites(json.data)
            setShowLoader(false)
        })
         fetch(`/api/conjunction/getConjunction?&sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            // console.log(' tableData: ', json.data);
            console.log(' tableData before response: ', tableDataState);
            setTableDataState(json.data)
            console.log(' tableData after response: ', tableDataState);
            setShowLoader(false)
        })
    }, []);
    
  

    console.log('satellite', activeSatellite)
 
    const handleGetExactSatellite = async (satellite) =>  {
        setShowLoader(true)
        setActiveSatellite(satellite)
        firstQueryParam = 0;
        secondQueryParam = 29;
        let requestParam = ''
        let satReqPar = ''
        let sortByCreatedReqPar = ''
        let sortByTcaReqPar = ''
        let sortByColProbReqPar = ''
        let sortByMissDisReqPar = ''
        if (activeSatellite){  satReqPar=`&sat=${activeSatellite.noradId}` }
        if (sortByCreated){  sortByCreatedReqPar=`&sortBy=created&sortDir=${toggleSortCreated}` }
        if (sortByTca){  sortByTcaReqPar=`&sortBy=tca&sortDir=${toggleSortTca}` }
        if (sortByColProb){  sortByColProbReqPar=`&sortBy=ColProb&sortDir=${toggleSortColProb}` }
        if (sortByMissDis){  sortByMissDisReqPar=`&sortBy=missDis&sortDir=${toggleSortMissDis}` }
        if ( typeof satellite === "object" ){
             requestParam = `index=${firstQueryParam}-${secondQueryParam}&sat=${satellite.noradId}`
        } 
        else {
            requestParam = `&sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}`
        }
        console.log('REQUEST PARAM: ', requestParam);
        const response = await fetch(`api/conjunction/getConjunction?${requestParam}${sortByCreatedReqPar}${sortByTcaReqPar}${sortByColProbReqPar}${sortByMissDisReqPar}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'credentials': "include",
            }
        })
        if(response.status === 200 ){

            const json = await response.json();
            setTableDataState(json.data)
            setShowLoader(false)
        }
        if(response.status === 401 ){

            localStorage.setItem('login', "false");
            setIsAuthenticated(false)
                   
      
      }

    }


    // from sandbox for lazy loading
    const [scrollContainerRect, setScrollContainerRect] = useState({});
    const [scrollTop, setScrollTop] = useState(0);
    const onScroll = useCallback(
        throttle(({ scrollTop, scrollContainerRect }) => {
          setScrollContainerRect(scrollContainerRect);
          setScrollTop(scrollTop);
        }, 1200),
        [setScrollContainerRect, setScrollTop]
      );
    
      const onMount = useCallback(
        ref => {
          setScrollContainerRect(ref.getBoundingClientRect());
        },
        [setScrollContainerRect]
      );
      

      const appendItems = useCallback( async() => {
        
         if(stopAppendItems) return;

        firstQueryParam +=30;
        secondQueryParam +=30; 
        let satReqPar = ''
        let sortByCreatedReqPar = ''
        let sortByTcaReqPar = ''
        let sortByColProbReqPar = ''
        let sortByMissDisReqPar = ''

        if (activeSatellite){  satReqPar=`&sat=${activeSatellite.noradId}` 
        }else{satReqPar='&sat=allSatellite'}

        if (sortByCreated){  sortByCreatedReqPar=`&sortBy=created&sortDir=${toggleSortCreated}` }
        if (sortByTca){  sortByTcaReqPar=`&sortBy=tca&sortDir=${toggleSortTca}` }
        if (sortByColProb){  sortByColProbReqPar=`&sortBy=ColProb&sortDir=${toggleSortColProb}` }
        if (sortByMissDis){  sortByMissDisReqPar=`&sortBy=missDis&sortDir=${toggleSortMissDis}` }
        setShowSmallLoader(true)
        const response = await fetch( `/api/conjunction/getConjunction?index=${firstQueryParam}-${secondQueryParam}${satReqPar}${sortByCreatedReqPar}${sortByTcaReqPar}${sortByColProbReqPar}${sortByMissDisReqPar}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
                }
        });
        if(response.status === 200 ){


            const json = await response.json();
            setShowSmallLoader(false) 
            if(json.data.length === 0 ){ setStopAppendItems(true); return; }
            setTableDataState( [
                        ...tableDataState,    
                        ...json.data])
                   
      
      }
      if(response.status === 401 ){

        localStorage.setItem('login', "false");
        setIsAuthenticated(false)
               
  
  }
    
    
    }, [tableDataState, setTableDataState]);

    const handleSortCreated = () => {
        // setToggleSortCreated(prevState => !prevState)
        setSortByCreated(true)

        if(toggleSortCreated == null){setToggleSortCreated( true )}
        if(toggleSortCreated != null) { setToggleSortCreated(prevState => !prevState) }
       
      }
      useEffect(()=>{
          if(sortByCreated){
            firstQueryParam = 0;
            secondQueryParam = 29;
           
            setSortByTca(false)
            setSortByColProb(false)
            setSortByMissDis(false)
            
            setToggleSortTca(null)
            setToggleSortMissDis(null)
            setToggleSortColProb(null)
    
            let requestParam = ''
            if ( typeof activeSatellite === "object" ){
                 requestParam = `index=${firstQueryParam}-${secondQueryParam}&sat=${activeSatellite.noradId}&sortBy=created&sortDir=${toggleSortCreated}`
            } 
            else {
                requestParam = `sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}&sortBy=created&sortDir=${toggleSortCreated}`
            }
            console.log('REQUEST PARAM: ', requestParam);
            fetch(`api/conjunction/getConjunction?${requestParam}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                    'credentials': "include",
                }
            }).then(async (res) => await res.json()).then((json) =>{
                console.log('from 88833: ', json.data);
                setTableDataState(json.data)
                console.log('sorted by created')
            })

          }
      },[toggleSortCreated])
    
    const handleSortTca = () => {
          setSortByTca(true)
          if(toggleSortTca == null){setToggleSortTca( true )}
          if(toggleSortTca != null) { setToggleSortTca(prevState => !prevState) }
 
       
      }
      useEffect(()=>{
        if(sortByTca){

            firstQueryParam = 0;
            secondQueryParam = 29;
    
           setSortByCreated(false)
           setSortByColProb(false)
           setSortByMissDis(false)
    
           setToggleSortCreated(null)
           setToggleSortMissDis(null)
           setToggleSortColProb(null)
    
            let requestParam = ''
            if ( typeof activeSatellite === "object" ){
                 requestParam = `index=${firstQueryParam}-${secondQueryParam}&sat=${activeSatellite.noradId}&sortBy=tca&sortDir=${toggleSortTca}`
            } 
            else {
                requestParam = `sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}&sortBy=tca&sortDir=${toggleSortTca}`
            }
            console.log('REQUEST PARAM: ', requestParam);
            fetch(`api/conjunction/getConjunction?${requestParam}`, {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'cache-control': 'no-cache',
                    'credentials': "include",
                }
            }).then(async (res) => await res.json()).then((json) =>{
                console.log('from 88833: ', json.data);
                setTableDataState(json.data)
                console.log('sorted by TCA')
            })

      }
     },[toggleSortTca])
    
    
    const handleSortColProb = () => {
       
        setSortByColProb(true)

        if(toggleSortColProb == null){setToggleSortColProb( true )}
        if(toggleSortColProb != null) { setToggleSortColProb(prevState => !prevState) }

    }
    useEffect(()=>{
        if(sortByColProb){
            firstQueryParam = 0;
            secondQueryParam = 29;
            setSortByCreated(false)
            setSortByTca(false)
            setSortByMissDis(false)

            setToggleSortCreated(null)
            setToggleSortMissDis(null)
            setToggleSortTca(null)

                let requestParam = ''
                if ( typeof activeSatellite === "object" ){
                    requestParam = `index=${firstQueryParam}-${secondQueryParam}&sat=${activeSatellite.noradId}&sortBy=ColProb&sortDir=${toggleSortColProb}`
                } 
                else {
                    requestParam = `sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}&sortBy=ColProb&sortDir=${toggleSortColProb}`
                }
                console.log('REQUEST PARAM: ', requestParam);
                fetch(`api/conjunction/getConjunction?${requestParam}`, {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'cache-control': 'no-cache',
                        'credentials': "include",
                    }
                }).then(async (res) => await res.json()).then((json) =>{
                    console.log('from 88833: ', json.data);
                    setTableDataState(json.data)
                    console.log('sorted by col prob')
                })
            }

    },[toggleSortColProb])

      const handleSortMissDis =  () => {

          setSortByMissDis(true)

        if(toggleSortMissDis == null){setToggleSortMissDis( true )}
        if(toggleSortMissDis != null) { setToggleSortMissDis(prevState => !prevState) }
      }
      useEffect(()=>{

        if(sortByMissDis){
            firstQueryParam = 0;
            secondQueryParam = 29;

            setSortByCreated(false)
            setSortByTca(false)
            setSortByColProb(false)

            setToggleSortCreated(null)
            setToggleSortColProb(null)
            setToggleSortTca(null)

            let requestParam = ''
            if ( typeof activeSatellite === "object" ){
                requestParam = `index=${firstQueryParam}-${secondQueryParam}&sat=${activeSatellite.noradId}&sortBy=missDis&sortDir=${toggleSortMissDis}`
            } 
            else {
                requestParam = `sat=allSatellite&index=${firstQueryParam}-${secondQueryParam}&sortBy=missDis&sortDir=${toggleSortMissDis}`
            }
            console.log('REQUEST PARAM: ', requestParam);
            fetch(`api/conjunction/getConjunction?${requestParam}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'cache-control': 'no-cache',
                'credentials': "include",
            }
        }).then(async (res) => await res.json()).then((json) =>{
            console.log('from 88833: ', json.data);
            setTableDataState(json.data)
            console.log('sorted by miss dis')
        })

        }

      },[toggleSortMissDis])

    const getCsvInfo= async ()=> {
        // setShowLoader(true)
         const response = await fetch('/api/conjunction/export', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'cache-control': 'no-cache',
            'credentials': "include",
            }
        });

        if(response.status === 200 ){
            const json = await response.json();
            setCsvData(json.data.rows);
            setHeadersData(json.data.headers);
      }
      if(response.status === 401 ){

        localStorage.setItem('login', "false");
        setIsAuthenticated(false)
    }
        
        
        // .then(async (res) => await res.json()).then((json) =>{
        //     console.log('dataFromAll: ', json.data.headers);
        //     setCsvData(json.data.rows);
        //     setHeadersData(json.data.headers);

        // })
    }
    useEffect(()=>{
        getCsvInfo()
    },[])

    return (
        <>
        { showLoader && < CircleLoader type={'dashBoard'} /> }
        <div className={classes.tablePage_wrapper} >
            < DashBoardHeader
                  allSatellites = {allSatellites}
                  setAllSatellites ={setAllSatellites}
                  activeSatellite = {activeSatellite}
                  setActiveSatellite = {setActiveSatellite}
                  type={'table'}
                  handleGetExactSatellite={handleGetExactSatellite }
                />

        <div className="table_flexHeaderWrapper">
            <div className="table_headerWrapper"> 
                { activeSatellite &&
                    <div className="table_headerButton_shawAll" onClick = {()=>{handleGetExactSatellite(false) }} >
                       <KeyboardArrowDownIcon />
                        Show All
                    </div>
                 }
                { activeSatellite ? activeSatellite.name : 'All Satellites' }
                {/* {  activeSatellite &&  <CreateOutlinedIcon onClick ={handleOpenEditModal} /> } */}
            </div>
            { tableDataState.length === 0 ? null :
                 <div className="">
                    <button className="tableAllSatellites_exportButton" type="button">
                         
                         { csvData && headersData && 
                            <CSVLink 
                                // {...csvReport}  
                                filename={'Conjunctions.csv'} 
                                data={csvData} 
                                headers={headersData}
                                // onClick = {()=>{getCsvInfo()}}
                            >
                                Export CSV 
                            </CSVLink> 
                        }
                    </button>

                 </div>
             } 

        </div>
        { (!(tableDataState.length === 0) ) && 
        <>
        <TableHead  
            handleSortCreated={handleSortCreated}
            handleSortTca = {handleSortTca}
            handleSortColProb={handleSortColProb}
            handleSortMissDis={handleSortMissDis}
            />

       
                <ScrollContainer onScroll={onScroll} onMount={onMount}>
                <LazyLoader 
                    scrollTop={scrollTop}
                    scrollContainerRect={scrollContainerRect}
                    onIntersection={appendItems}
                    showSmallLoader={showSmallLoader}
                >
                        {tableDataState.map( (rowData, index) => {
                            
                            return(
                                <TableRow 
                                    key={index} 
                                    rowData={rowData} 
                                    dataMissDistance={rowData.chartDataMissDistance}
                                    dataCollisionProbability = {rowData.chartDataCollisionProbability}
                                    />  
                            )
                        } )}
                    </LazyLoader>
                </ScrollContainer>
            
            </>
            }
            {
                tableDataState.length === 0 && !showLoader &&
                <div className="tablePage_noDataWrapper">
                    <RockerSvg />
                    <h2 className="table_headerWrapper"> No Conjunctions Detected </h2>
                </div>
            }
            
        {/* </div> */}

        </div>
        </>
    )
}