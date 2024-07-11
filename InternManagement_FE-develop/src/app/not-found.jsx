"use client"
import { Button, Result } from "antd";
import { useSelector } from "react-redux";
import { ROLE } from "../constant/role";
import { useRouter } from "next/navigation";

export default function Custom404() {
    // const role = useSelector(state => state.role);
    const router = useRouter();

    function onBack() {
        // if (role === ROLE.ADMIN) {
        //     router.push('/admin');
        //     return;
        // }
        // if (role === ROLE.TEACHER) {
        //     router.push('/teacher');
        //     return;
        // }
        // if (role === ROLE.STUDENT) {
        //     router.push('/student');
        //     return;
        // }
        // if (role === ROLE.BUSINESS) {
        //     router.push('/business');
        //     return;
        // }
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={onBack}>Back Home</Button>}
        />
    );
}