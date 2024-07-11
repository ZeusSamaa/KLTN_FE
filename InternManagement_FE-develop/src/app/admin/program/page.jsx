'use client'
import React, { useEffect, useMemo, useState } from "react";
import { Input, Table } from "antd";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { faFileImport, faFilePdf, faPlus, faSchool } from "@fortawesome/free-solid-svg-icons";
import Modal from 'react-bootstrap/Modal';

// Components
import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import { IProgram } from "@/modals/program";
import { PROGRAM_COLUMNS } from "@/constant/column-data";
import { label } from "@/constant/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "@/components/Modal";

import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);

function ProgramModal(props) {
    const { program, schoolId, onRender, onHide } = props;
    const [programName, setProgramName] = useState(program?.name);

    const onPostProgram = () => {
        let type = 'create';
        let body = {
            school_id: parseInt(schoolId),
            program_name: programName?.trim()
        }
        if (program?.name) {
            body.id = program.id;
            type = 'update';
        } 
        GeneralService
        .postProgram(body, type)
        .then(() => {
            onRender();
            onHide();
        })
    }

    return (
        <CustomModal 
            heading={"Thông tin Chương trình học"}
            onHide={onHide}
            onSave={onPostProgram}
            saveButtonLabel={program?.id ? 'Lưu thay đổi' : 'Thêm mới'}
        >
            <p className={cx("todo-label")}>Tên chương trình học</p>
            <Input 
                className={cx("todo-content")} 
                placeholder="Chương trình học..." 
                value={programName}
                onChange={e => setProgramName(e.target.value)}
            />
        </CustomModal>
    );
}

export default function Program() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');

    const [isLoading, setIsLoading] = useState(true);
    const [selectedProgram, setSelectedProgram] = useState(null);
    const [programs, setPrograms] = useState([]);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const columns = useMemo (() => PROGRAM_COLUMNS, []);

    const getAllPrograms = async () => {
        await GeneralService
            .getAllPrograms(schoolId)
            .then((res) => {
                let _programs = [];
                res.data.forEach((program, index) => {
                    _programs.push(
                        new IProgram(
                            index + 1,
                            program.id, 
                            program.program_name, 
                            "Đại học Công nghệ thông tin"
                        )
                    )
                })
                setPrograms(_programs);
                setIsLoading(false);
            })
            .catch((error) => console.log('error: ', error))
    }

    useEffect(() => {
        getAllPrograms();
    }, [schoolId])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Chương trình học'} icon={faSchool}/>
            {/* <ButtonBack prevPath={'/admin'}/> */}
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    <div className={cx('d-flex gap-3')}>
                        <button 
                            className={cx("view-btn")} 
                            onClick={() => setSelectedProgram({})}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon")} 
                                icon={faPlus} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Thêm mới
                        </button>
                        <button 
                            className={cx("view-btn", "sucess")} 
                            onClick={() => {}}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon", "sucess")} 
                                icon={faFileImport} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Tải lên
                        </button>
                        <button 
                            className={cx("view-btn", "warn")} 
                            onClick={() => {}}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon", "warn")} 
                                icon={faFilePdf} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Xuất File
                        </button>

                    </div>
                    <div className={cx('table-data')}>
                        <Table 
                            loading={isLoading}
                            bordered
                            columns={columns} 
                            dataSource={programs} 
                            pagination={tableParams?.pagination}
                            onRow={(record) => { 
                                return {
                                    onClick: event => {
                                        setSelectedProgram(record);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                selectedProgram && Object.keys(selectedProgram)?.length > 0 && (
                    <ProgramModal
                        show={Object.keys(selectedProgram).length > 0}
                        onHide={() => setSelectedProgram(null)}
                        program={selectedProgram} 
                        schoolId={schoolId}
                        onRender={() => getAllPrograms()}
                    />
                )
            }
            {
                selectedProgram && Object.keys(selectedProgram)?.length === 0 && (
                    <ProgramModal
                        show={Object.keys(selectedProgram).length === 0}
                        onHide={() => setSelectedProgram(null)}
                        program={selectedProgram}
                        schoolId={schoolId}
                        onRender={() => getAllPrograms()}
                    />
                )
            }
        </div>
    )
}