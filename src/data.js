module.exports = {
    series: {
        name: '[ undefined ]',
        completed: false,
        inProgress: false,
        data: {
            races: [
                {
                    id: 0,
                    name: 'Race #0',
                    completed: false,
                    inProgress: false,
                    standings: []
                },
                {
                    id: 1,
                    name: 'Race #1',
                    completed: false,
                    inProgress: false,
                    standings: []
                },
                {
                    id: 2,
                    name: 'Race #2',
                    completed: false,
                    inProgress: false,
                    standings: []
                },
                {
                    id: 3,
                    name: 'Race #3',
                    completed: false,
                    inProgress: false,
                    standings: []
                },
            ],
            // join: [
            //     {
            //         user_id: [],
            //         race_id: []
            //     },
            //     {
            //         user_id: [],
            //         race_id: []
            //     },
            //     {
            //         user_id: [],
            //         race_id: []
            //     },
            // ],
            participants: [
                {

                    id: 0,
                    name: 'Steamy',
                    race_id: [1, 2, 3]
                },
                {

                    id: 1,
                    name: 'Taylor',
                    race_id: [1, 2]
                },
                {
                    id: 2,
                    name: 'Chaco',
                    race_id: [2, 3]
                },
                {
                    id: 3,
                    name: 'Thunderbutt',
                    race_id: [3, 0]
                },
                {
                    id: 4,
                    name: 'Hashtag',
                    race_id: [2, 0]
                },
                {
                    id: 5,
                    name: 'Yolo',
                    race_id: [1, 2, 3]
                },
                {
                    id: 6,
                    name: 'Drake',
                    race_id: [1, 2, 3]
                },
            ]

        }
    }

}