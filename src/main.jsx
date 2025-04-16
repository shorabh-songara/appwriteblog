import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AuthLayout from './components/AuthLayout.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import AllPost from './pages/AllPost.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:<App/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/Login",
          element : (
            <AuthLayout authentication = {false}>
              <Login/>
            </AuthLayout>
          )
        },
        {
          path:"/signUp",
          element:(
            <AuthLayout authentication = {false}>
              <Signup/>
            </AuthLayout>
          )
        },
        {
          path:"/all-posts",
          element:(
            <AuthLayout authentication>
              {" "}
              <AllPost/>

            </AuthLayout>
          )
        },
        {
          path:"/add-post",
          element:(
            <AuthLayout authentication>
              {" "}
              <AddPost/>
            </AuthLayout>
          )
        },

        {
          path:'/edit-post',
          element:(
            <AuthLayout authentication>
              {""}
              <EditPost/>
            </AuthLayout>
          )
        },
        {
          path:"/post/:slug",
          element:<Post/>
        }
      ]

    },
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
