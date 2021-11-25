import React, { lazy, Suspense, useEffect } from 'react'
import {  useSelector, useDispatch  } from 'react-redux'
import { userFollowPostsFetch } from '../store/actions/userActions'
import { Link } from 'react-router-dom'

// import Feed from '../containers/Feed'
import Loading from '../components/Loading'


const Feed = lazy(() => import('../containers/Feed'))

const Home = () => {
   const currentUser = useSelector((state) => state.currentUser)
   const followsPosts = useSelector((state) => state.followsPosts)
   const dispatch = useDispatch()

   useEffect(() => {
      dispatch(userFollowPostsFetch(currentUser.id))
   },[])

   console.log(followsPosts)
   return (
      <Suspense fallback={<Loading sequence="home"/>}>
         <div className="home-page">
            <div className="header">
               <h3>Welcome to GoodBread {currentUser.username}!</h3>
               <Link to="/new-post" className="link-btn">New Post</Link>
            </div>
            <Feed posts={followsPosts} />   
            
         </div>
      </Suspense>
   )    
}



export default Home