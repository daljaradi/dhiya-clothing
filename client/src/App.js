import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector } from 'reselect';

import Home from './pages/homepage/Home';
import CheckoutPage from './pages/checkout/checkout';
import ShopPage from './pages/shoppage/shop';
import Header from './components/header/header';
import {GlobalStyle} from './global.styles';
import SignInSignUp from './pages/signIn-signUp/signIn-signUp';
import {auth, createUserProfileDocument} from './firebase/firebase.utils';
//import {addCollectionAndDocuments} from './firebase/firebase.utils'; to move the data collecton to firebase
import { setCurrentUser } from './components/redux/user/user.actions';
import {selectCurrentUser} from './components/redux/user/user.selectors';
//import  { selectCollectionsForPreview } from './components/redux/shop/shop.selectors'; the same note




class App extends React.Component{
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
    //const {setCurrentUser, collectionsArray} = this.props; to move the data collection to firebase

    this.unsubscribeFromAuth=auth.onAuthStateChanged(async userAuth =>{
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot =>{
          setCurrentUser({             
                id:snapShot.id,
                ...snapShot.data()             
          });
        });
      }
          setCurrentUser(userAuth);
          //addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=>({title, items})));      
    });
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }
  
   render(){
      return (
        <div >
          <GlobalStyle/>
            <Header />
            <Switch>
              <Route exact path= '/' component={Home} />
              <Route  path ='/shop' component={ShopPage} />
              <Route exact path='/checkout' component={CheckoutPage} />
              <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignUp/>)} />
            </Switch>
          
        </div>
      );
   }
  
}
const mapStateToProps =createStructuredSelector({
  currentUser: selectCurrentUser
 //collectionsArray: selectCollectionsForPreview    the same note above
})
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
