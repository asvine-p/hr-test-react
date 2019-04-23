import React, {Component} from 'react';
import axios from 'axios';
import _ from "lodash";
import moment from "moment";
import 'moment/locale/fr'
import ActivitiesHeader from "./ActivitiesHeader";
import ActivityRow from "./ActivityRow";  // without this line it didn't work
moment.locale('fr');

const GET_METHOD = "get";
const API_URL = 'https://api.runningheroes.com';
const API_USER_ENDPOINT = "/v3/users/56c35408de31c6b954b81080/activities";
const requestHeaders = {
    "Content-Type": "Application/json",
};
const queryStringParams = (rowsLimit) => ({
    limit : rowsLimit,
    sort: '-date',
    skip: 0
});


class ActivityList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: {}
        }
    }

    componentDidMount() {
        this.fetchActivitiesList(this.props.limit);
    }

    // RETURN AN OBJECT WITH FORMATTED DATE AS KEY AND RESULT AS VALUE
    groupActivitiesByDate = (activities) => {
        return _.groupBy(activities, activity =>
            moment(activity.date).startOf('day').format("ll"));

    };

    componentWillReceiveProps(nextProps, nextContext) {
        // UPDATE LIST WHEN SEE MORE IS CLICKED
        if (this.props.limit !== nextProps.limit)
            this.fetchActivitiesList(nextProps.limit);
    }

    setActivities = (newActivities) => {
        this.setState({
            activities: newActivities
        });
    };


    fetchActivitiesList = (limit) => {
        const config = {
            method: GET_METHOD,
            headers: requestHeaders,
            url: API_URL + API_USER_ENDPOINT,
            params: queryStringParams(limit)
        };
        axios(config)
            .then(res => {
                const result = res.data.results;
                const groupedActivities = this.groupActivitiesByDate(result);
                this.setActivities(groupedActivities);
            })
            .catch(err => {
                console.warn("FETCH_ACTIVITIES_ERROR", err);
            });
    };

    render() {
        const activitiesKeysList = Object.keys(this.state.activities);
        return (
            <div>
                {
                    activitiesKeysList.map(activityDateTitle => {
                        return (<div className={"App-activities"} key={activityDateTitle}>
                            <ActivitiesHeader title={activityDateTitle}/>
                            {
                                this.state.activities[activityDateTitle].map((activity, index) => {
                                    return <ActivityRow
                                            key={index}
                                            distance={activity.distance}
                                            duration={activity.duration}
                                            type={activity.type} />
                            })
                            }
                    </div>)
                })
                }

            </div>
        );
    }
}

export default ActivityList;
