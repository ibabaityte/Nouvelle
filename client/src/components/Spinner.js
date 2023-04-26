import { HalfMalf } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const Spinner = () => {
    return (
        <HalfMalf
                   bgColor={"white"}
                   center={false}
                   width={"150px"}
                   height={"150px"}
        />
    );
}

export default Spinner;
