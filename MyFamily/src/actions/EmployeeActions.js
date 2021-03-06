import { EMPLOYEE_UPDATE,EMPLOYEE_CREATE, EMPLOYESS_FETCH_SUCCESS, EMPLOYEE_SAVE_SUCCESS,EMPLOYEE_DELETE_SUCCESS, EMPLOYEE_DATA_RERESH } from './types'
import firebase, { auth } from 'firebase';
import {Actions} from  'react-native-router-flux';

export const EmployeeUpdate = ({prop, value}) => {
    return{
            type: EMPLOYEE_UPDATE ,
            payload: {prop,value}
        };
}

export const EmployeeRecordCreate = ({nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents,isEmergencyCall}) => {
   console.log('Create Action ********* ',nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents,isEmergencyCall);
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({nameUser,phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents,isEmergencyCall})
    .then(() => {
        dispatch({type:EMPLOYEE_CREATE});
        Actions.EmployeeList({type: 'reset'})
    });  
  }  
}
export const employeeRecordRefresh = () =>{
    return(dispatch ) => {
        dispatch({type:EMPLOYEE_DATA_RERESH});
    }
 
}

export const employeesFetch = () => {
    
    const { currentUser } = firebase.auth();

    return(dispatch) => {

        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on( 'value', snapshot => {
            
        dispatch({
            type: EMPLOYESS_FETCH_SUCCESS,
            payload: snapshot.val()
          });
        });
    };
};

export const employeeSave = ({nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents, isEmergencyCall, uid}) => {

    console.log('In eidt mode ^^^^^^^^^^^^ ',nameUser, phone, dob, image, repeatValue, isReminder,bdayMsg, arrayEvents,isEmergencyCall);

    const { currentUser } = firebase.auth();

    return(dispatch) =>{
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
          .set({ nameUser , phone, dob, image, repeatValue, isReminder, bdayMsg, arrayEvents,isEmergencyCall })
          .then(() => {
            dispatch({type:EMPLOYEE_SAVE_SUCCESS});
            Actions.EmployeeList({type: 'reset'});
        });
    }
}

export const employeeDelete = ({ uid }) =>{

    // let nameUser= '' , phone = '', dob='', image='', repeatValue='', isReminder=constants.kNo, bdayMsg='', arrayEvents=[],isEmergencyCall = constants.kNo;
    const { currentUser } = firebase.auth();

    return() => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove()
        .then(() => {
            //dispatch({type:EMPLOYEE_SAVE_SUCCESS});
            Actions.EmployeeList({type: 'reset'});
        });
    }

}