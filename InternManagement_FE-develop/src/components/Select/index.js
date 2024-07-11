import classNames from "classnames/bind";
import styles from './Select.module.scss';
// import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const cx = classNames.bind(styles);

export default function SelectOption({ label, state, data, onChange }) {
    return (
        // <FormControl 
        //     sx={{ minWidth: 120 }} 
        //     size="small" 
        //     className={cx('select-container')}
        // >
        //     <InputLabel id="demo-select-small-label">{label}</InputLabel>
        //     <Select
        //         labelId="demo-select-small-label"
        //         id="demo-select-small"
        //         value={state}
        //         label={label}
        //         onChange={onChange}
        //         className={cx('select-option')}
        //     >
        //         <MenuItem value="">
        //             <em>Trống</em>
        //         </MenuItem>
        //         {
        //             data.map((item, index) => (
        //                 <MenuItem key={index} value={item?.value}>{item?.label}</MenuItem>
        //             ))
        //         }
        //     </Select>
        // </FormControl>
        <></>
    )
}