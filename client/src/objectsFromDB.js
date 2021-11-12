

export const objectsGeneralToDashboardFromDB = {
    
    allSatellites:[
            {
                name: 'Cartosat-2 Series Satellite',
                isGuarded : false,
                risk: 'High Risk'
            },
            {
                name: 'CMS-01',
                isGuarded : false,
                risk: 'Low Risk'
            },
            {
                name: 'EOS-01',
                isGuarded : true,
                risk: 'High Risk'
            },
            {
                name: 'Chandrayaan2',
                isGuarded : true,
                risk: 'Low Risk'
            },
            {
                name: '	GSAT-31',
                isGuarded : false,
                risk: 'High Risk'
            },
            {
                name: '	GSAT-11 Mission',
                isGuarded : true,
                risk: 'High Risk'
            },
            {
                name: 'INS-1A',
                isGuarded : true,
                risk: 'Low Risk'
            },
            {
                name: 'RESOURCESAT-2A',
                isGuarded : true,
                risk: 'High Risk'
            },
            {
                name: 'Crew module Atmospheric Re-entry Experiment (CARE)',
                isGuarded : true,
                risk: 'Low Risk'
            },
            {
                name: '	Mars Orbiter Mission Spacecraft',
                isGuarded : false,
                risk: 'High Risk'
            },
            {
                name: 'Megha-Tropiques',
                isGuarded : true,
                risk: 'High Risk'
            },
            {
                name: 'Megha-Tropiques',
                isGuarded : true,
                risk: 'Low Risk'
            },
            {
                name: 'Crew module Atmospheric Re-entry Experiment (CARE)',
                isGuarded : true,
                risk: 'Low Risk'
            },
            {
                name: '	Mars Orbiter Mission Spacecraft',
                isGuarded : false,
                risk: 'High Risk'
            },
            {
                name: 'Megha-Tropiques',
                isGuarded : true,
                risk: 'High Risk'
            },
            {
                name: 'Megha-Tropiques',
                isGuarded : true,
                risk: 'Low Risk'
            }
        ],
    totalNumSatellite: '42'
}

export const objectsToDashboardFromDB = {
    totalNumConjunctions: '785 458 585',
    mostCommonObjectThatSatellitesConjunct: 'Ariane-5 VA-215',
    highestCollisionRisk: {
        num :'4 748',
        satellite: 'Ariane-5 VA-215 Ariane-5'
    },
    closestEncounter: {
        num :'52m',
        satellite: 'Cartosat-2 Series Satellite'
    },
    charts:{
        donutChart: {
            debris: 41,
            payload: 29,
            rocketBody: 15,
            unknown:10,
            other: 5, 
        },
        barChart: {
            0: 1532,
            1: 2856,
            2: 2456,
            3: 4300,
            4: 3100,
            5: 2793,
            6: 1030,
            7: 430 
        },
        lineChart: {
            days:  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ],
            numberOfConjunctions:  [ 2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 1234, 2131, 
                                    876, 456,   2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 
                                    1234, 2131, 876, 456, 3145, 2345, 3214, 1234, 2131, 876]
        }
    }}
export const objectsToDashboardOneSatelliteFromDB = {
  
    totalNumConjunctions: '58 585',
    mostCommonObjectThatSatellitesConjunct: 'CORNE VA-215',
    highestCollisionRisk: {
        num :'9 768',
        satellite: 'VA-215 DASH-ARR'
    },
    closestEncounter: {
        num :'1200m',
        satellite: 'Cartosat-2 Series Satellite'
    },
    charts:{
        donutChart: {
            debris: 25,
            payload: 50,
            rocketBody: 5,
            unknown:5,
            other: 15, 
        },
        barChart: {
            0: 1532,
            1: 2856,
            2: 2456,
            3: 4300,
            4: 3100,
            5: 2793,
            6: 1030,
            7: 430 
        },
        lineChart: {
            days:  [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30 ],
            numberOfConjunctions:  [ 2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 1234, 2131, 
                                    876, 456,   2400, 1500, 2344, 555, 234, 3145, 2345, 3214, 
                                    1234, 2131, 876, 456, 3145, 2345, 3214, 1234, 2131, 876]
        }
    }

}

export const allSatellitesTptableHead = [
    'Cartosat-2 Series Satellite', 'CMS-01', 'EOS-01', 'Chandrayaan2', 'GSAT-31', 'GSAT-11 Mission', 
    'INS-1A', 'RESOURCESAT-2A', 'Crew module Atmospheric Re-entry Experiment (CARE)', 'Mars Orbiter Mission Spacecraft',
    'Megha-Tropiques',  '	Mars Orbiter Mission Spacecraft'
] 

export const objectsToTableFromDB = [
    {   
        conjunctionId : '12345671', 
        created: '2021-08-16 05:12:17.167000',
        tca: '2021-08-16 05:12:17.167000', 
        collisionProbability:' 0.008',   // '0.10000000005696158', 
        missDistance: '3651', 
        chaser: '	Mars Orbiter Mission Spacecraft',
        target: 'RESOURCESAT-2A',
        classification: 'High Risk'
    },
    {   
        conjunctionId : '12345672', 
        created: '2021-08-16 05:12:17.167000',
        tca: '2021-08-16 05:12:17.167000', 
        collisionProbability: '0.02', 
        missDistance: '1365', 
        chaser: '	Mars Orbiter Mission Spacecraft',
        target: 'RESOURCESAT-2A',
        classification: 'High Risk'
    },
    {   
        conjunctionId : '12345673', 
        created: '2021-08-16 05:12:17.167000',
        tca: '2021-08-16 05:12:17.167000', 
        collisionProbability: '0.003', 
        missDistance: '9365', 
        chaser: '	Mars Orbiter Mission Spacecraft',
        target: 'RESOURCESAT-2A',
        classification: 'High Risk'
    },
    {   
        conjunctionId : '12345674', 
        created: '2021-08-16 05:12:17.167000',
        tca: '2021-08-16 05:12:17.167000', 
        collisionProbability: '0.40040000005696158', 
        missDistance: '4365', 
        chaser: '	Mars Orbiter Mission Spacecraft',
        target: 'RESOURCESAT-2A',
        classification: 'High Risk'
    },
]
