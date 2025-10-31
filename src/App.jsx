import s from './App.module.scss';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ToastContainer, Slide } from "react-toastify";
//api
import { getProfile } from './api/Api';
//slice
import { setUser } from './redux/user/slice';
import { setSearchQuery } from './redux/filters/slice';
//hooks
import useRefetch from './hooks/useRefetch';
//components
import List from './pages/List/List';
import Detail from './pages/Detail/Detail';
import Create from './pages/Create/Create';

const App = () => {
    useRefetch()
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('searchQueryBills', '')
        dispatch(setSearchQuery(''))

        getProfile()
            .then(res => {
                const data = res.data.data;
                dispatch(setUser(data))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div id='scrollableDiv' className={s.root}>
            <Routes>
                <Route path='/'
                    element={<List />}
                />

                <Route path='/create'
                    element={<Create />}
                />
                <Route path='/detail/:id'
                    element={<Detail />}
                />

            </Routes>

            <ToastContainer
                position="top-center"
                hideProgressBar
                closeOnClick
                pauseOnHover
                limit={3}
                transition={Slide}
            />
        </div>

    )
}

export default App;