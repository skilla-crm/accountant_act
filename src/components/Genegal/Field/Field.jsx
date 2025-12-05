import s from './Field.module.scss';
import classNames from 'classnames';

const Field = ({ vis, disabled, sub, text, span }) => {
    return (
        <div className={classNames(s.root, vis && s.root_vis)}>
            <span className={s.sub}>{sub}</span>
            <div className={classNames(s.field, disabled && s.field_disabled)}>
                <p className={s.text}>{text} <span>{span}</span></p>
            </div>

        </div>
    )
};

export default Field