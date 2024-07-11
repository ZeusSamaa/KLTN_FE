import classNames from "classnames/bind";
import styles from "./ViewJob.module.scss";

import FieldSet from "@/components/FieldSet";
import { Col, Row } from "react-bootstrap";

const cx = classNames.bind(styles);

export default function ViewJob({ job }) {
    return (
        <Row>
            <Col xs={12} md={6} lg={5} xl={5}>
                <img src={job.image} alt="" className={cx('detail-job-img')}/>
                <h6 className={cx('mt-3 mb-2')}>Kỹ năng yêu cầu</h6>
                <div className={cx('d-flex')}>
                    {
                        job.skills.map((skill, index) => (
                            <span key={index} className={cx('skill-item')}
                            >{skill.skill_name}</span>
                        ))
                    }
                </div>
            </Col>
            <Col xs={12} md={6} lg={7} xl={7}>
                <FieldSet heading="Mô tả công việc">
                    {job.job_desc}
                </FieldSet>
                <FieldSet heading="Yêu cầu công việc">
                    {job.requirements}
                </FieldSet>
                <FieldSet heading="Thông tin khác">
                    {job.another_information}
                </FieldSet>
            </Col>
        </Row>
    );
}