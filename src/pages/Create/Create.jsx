import s from './Create.module.scss';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
//components
import Bill from '../../components/Bill/Bill';

const Create = () => {
    const [anim, setAnim] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setAnim(true)
        })
    }, [])

    return (
        <div className={classNames(s.root, anim && s.root_anim)}>
            <Bill type={'create'} />
        </div>
    )
};

export default Create;