import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE , EMPLOYEE_SAVE_SUCCESS, EMPLOYEE_DELETE_SUCCESS, EMPLOYEE_DATA_RERESH} from '../actions/types';
import * as constants from '../components/Constants';

const INITIAL_STATE = {
    nameUser: '',
    phone: '',
    dob: new Date(), 
    image:'', 
    repeatValue:'', 
    isReminder:constants.kNo,
    bdayMsg: '',
    arrayEvents: [],
    isEmergencyCall:constants.kNo,
};

export default (state = INITIAL_STATE, action) => {
    // console.log( 'action is ---', action);
    switch(action.type){
        case EMPLOYEE_DATA_RERESH:
         return INITIAL_STATE;
        case EMPLOYEE_UPDATE:
         return {...state, [action.payload.prop]:action.payload.value};
       case EMPLOYEE_CREATE:
        return INITIAL_STATE;
       case EMPLOYEE_SAVE_SUCCESS:
         return INITIAL_STATE; 
         case EMPLOYEE_DELETE_SUCCESS:
      return INITIAL_STATE;
        default:
          return state;
    }
}