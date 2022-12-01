import HomePage from './components/HomePage'
import CountryPage from './components/CountryPage'

const routes = [
   {path: '/', component: HomePage},
   {path: '/country/:name', component: CountryPage, props:true}
]

export default routes;