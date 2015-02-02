//============================================================================================================================================
//Option #1: ALL in ONE api ==> LARGE DATA, LESS REQUEST

/** 
    ==> Area Chart
    #1: api/v1/PATH/TO/API-GROUP-BY-DATE
                        ?RetailerID=123
                        &StartDate=24/9/2012 &EndDate=20/3/2013     ==> [specific dates]
                        &Time=[enum]                                ==> [daily | weekly | monthly]
*/
var response = {
    StatusCode: 101,
    Result: {
        StartDate: '24/9/2012',//for debug
        EndDate: '20/3/2013',//for debug
        Time: '[daily | weekly | monthly | specific dates]',//for debug
        Trending: {
            Views: {
                Increase: -546,
                IncreasePercent: -40
            },
            Tags: {
                Increase: 34546,
                IncreasePercent: 4540
            },
            Desires: {
                Increase: -546,
                IncreasePercent: -40
            },
            Orders: {
                Increase: -546,
                IncreasePercent: -40
            },
            Sales: {
                Increase: -546,
                IncreasePercent: -40
            }
        },
        Data: [
            {
                Date: '25/07/2014',//DateTime or String
                Views: 11687,
                Tags: 81235,
                Desires: 5285,
                Orders: 716,
                Sales: 5879
            },
            {
                Date: '24/07/2014',
                Views: 223,
                Tags: 42,
                Desires: 52,
                Orders: 34,
                Sales: 7756
            }
        ]

    }
}
/** 
    ==> Geo Chart
    #2: api/v1/PATH/TO/API-GROUP-BY-LOCATION
                                        ?RetailerID=123
                                        &Time=[daily | weekly | monthly | specific dates]
                                        &StartDate=23/7/2014
                                        &EndDate=25/10/2014
                                        
*/
var response = {
    StatusCode: 101,
    Result: {
        StartDate: '',//for debug
        EndDate: '',//for debug
        Time: '[daily | weekly | monthly | specific dates]',//for debug
        Trending: {
            Views: {
                Increase: -546,
                IncreasePercent: -40
            },
            Tags: {
                Increase: 34546,
                IncreasePercent: 45
            },
            Desires: {
                Increase: -546,
                IncreasePercent: -40
            },
            Orders: {
                Increase: -546,
                IncreasePercent: -40
            },
            Sales: {
                Increase: -546,
                IncreasePercent: -40
            }
        },
        Data: [
            {
                Location: 'United State',
                Views: 11687,
                Tags: 81235,
                Desires: 5285,
                Orders: 716,
                Sales: 5879
            },
            {
                Location: 'Viet Nam',
                Views: 223,
                Tags: 42,
                Desires: 52,
                Orders: 34,
                Sales: 7756
            }
        ]

    }
}
//============================================================================================================================================