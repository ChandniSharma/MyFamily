import React from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import LoginForm from '../LoginForm';
import EmployeeList from '../components/EmployeeList';
import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from './EmployeeEdit';

 const RouterComponent = () => {
     return(
            <Router>
                <Scene key="root" hideNavBar >
                <Scene key="auth">
                    {/* <Scene key="login" component={LoginForm} title="Please login" /> */}
                    <Scene key="EmployeeCreate" component={EmployeeCreate} title="Add Member" />
                </Scene>
                <Scene key="main">
                    <Scene key ="EmployeeList" 
                    component = {EmployeeList} 
                    title = "Employee List" 
                    rightTitle="Add"
                    onRight={()=>{ Actions.EmployeeCreate()}}
                    initial
                    />
                    <Scene key="EmployeeCreate" component={EmployeeCreate} title="EmployeeCreate" />
                    <Scene key = "EmployeeEdit" component={EmployeeEdit} title = "EmployeeEdit" />
                </Scene>
                </Scene>
            </Router>
     );
}

export default RouterComponent;