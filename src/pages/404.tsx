import ErrorMessage from '../components/errorMassage/ErrorMassage'
import {Link} from 'react-router-dom'

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '24px'}}>Page doesn't exisst</p>
            <Link
                style={{display: 'block', fontSize: '24px', textAlign: 'center', fontWeight: 'bold', marginTop: '30px'}}
                to='/'
            >
                Back to home page
            </Link>
        </div>
    )
}
export default Page404;