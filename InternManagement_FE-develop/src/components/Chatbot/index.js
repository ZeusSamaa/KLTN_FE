import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Chatbot.module.scss';
// import { Close, Send } from '@mui/icons-material';
// import { useSelector } from 'react-redux';

import { RECOMMENDATION_QUESTIONS as jobs } from "@/constant/recommendation-question";

import { GeneralService } from "@/services/general.service"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

export default function ChatBot({ open }) {
    const [profile, setProfile] = useState(null);
    const [message, setMessage] = useState('');
    const [departments, setDepartments] = useState([]);
    const [chosedDepartment, setChosedDepartment] = useState({});
    const [allMessages, setAllMessages] = useState([]);
    const [caredField, setCaredField] = useState([]);

    const messageBody = useRef();

    const scrollToBottom = () => {
        messageBody.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const sendMessage = () => {};

    const getProfile = () => {
        GeneralService
            .getProfile()
            .then((res) => setProfile(res.data))
    }

    const getDepartments = () => {
        GeneralService
            .getAllDepartments(profile?.userData.schoolId)
            .then((res) => setDepartments(res.data))
    }

    useEffect(() => {
        getProfile();
        setAllMessages((prev) => [...prev, jobs.intro_question]);
    }, []);

    useEffect(() => {
        if (profile) {
            getDepartments();
        }
    }, [profile])

    useEffect(() => {
        scrollToBottom();
    }, [allMessages]);

    useEffect(() => {
        if (departments.length > 0) {
            const department_list = {
                departments,
            };
            setAllMessages((prev) => [...prev, department_list]);
        }
    }, [departments]);

    useEffect(() => {
        if (Object.keys(chosedDepartment).length > 0) {
            setAllMessages((prev) => [...prev, chosedDepartment]);
        }
    }, [chosedDepartment]);

    useEffect(() => {
        if (caredField.length > 0) {
            setAllMessages((prev) => [...prev, caredField]);
        }
    }, [caredField]);

    const handleChoseDepartment = (department) => {
        if (Object.keys(chosedDepartment).length === 0) {
            setChosedDepartment(department);
        }
    };

    const handleChoseCaredField = (field) => {
        if (caredField.length === 0) {
            setCaredField((prevFields) => [...prevFields, field]);
        }
    };

    const RecommendWithOneLevel = ({ field }) => {
        const [indexOfQuestion, setIndexOfQuestion] = useState(0);
        const [score, setScore] = useState({
            A: 0,
            B: 0,
        });
        const [isEnded, setIsEnded] = useState(false);
        const [continued, setContinued] = useState(false);
        const [clickedSubmit, setClickedSubmit] = useState(false);
        const [subCaredField, setSubCaredField] = useState([]);
        const [stopService, setStopService] = useState(false);
        const [showSoftSkill, setShowSoftSkill] = useState(false);
        const [showPromotion, setShowPromotion] = useState(false);

        useEffect(() => {
            scrollToBottom();
        }, [indexOfQuestion, score, clickedSubmit, stopService, continued, showSoftSkill, showPromotion]);

        const handleChoseSubCaredField = (field) => {
            if (!stopService) {
                setSubCaredField((prevFields) => [...prevFields, field]);
            }
        };

        const handleSetAnswer = (indexOfAnswer) => {
            const A_CHOICE = 0;
            const B_CHOICE = 1;

            const handleSetIndexOfQuestion = () => {
                if (indexOfQuestion < field.questions.length - 1) {
                    setIndexOfQuestion((prev) => prev + 1);
                    // scrollToBottom();
                } else {
                    if (!isEnded) {
                        setIsEnded(true);
                    }
                }
            };

            switch (indexOfAnswer) {
                case A_CHOICE:
                    setScore((prev) => ({ ...prev, ['A']: prev.A + 1 }));
                    handleSetIndexOfQuestion();
                    return;
                case B_CHOICE:
                    setScore((prev) => ({ ...prev, ['B']: prev.B + 1 }));
                    handleSetIndexOfQuestion();
                    return;
                default:
                    return;
            }
        };

        return (
            <React.Fragment>
                {field.questions.map(
                    (item, questionIndex) =>
                        questionIndex <= indexOfQuestion && (
                            <React.Fragment key={questionIndex}>
                                <div className={cx('chat-message', 'me')}>
                                    <span>{item.content}</span>
                                </div>
                                <div className={cx('field-list')}>
                                    {item.choices.map((choice, indexOfAnswer) => (
                                        <div className={cx('chat-message', 'choice')} key={choice.id}>
                                            <span onClick={() => handleSetAnswer(indexOfAnswer)}>
                                                {choice.choice_data}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </React.Fragment>
                        ),
                )}
                {isEnded &&
                    field.job_recommendations
                        .filter((item) => score.A >= item.min_agreements && score.A <= item.max_agreements)
                        .map((recommend, index) => (
                            <React.Fragment key={index}>
                                <div className={cx('chat-message', 'me')}>
                                    <span>Vị trí công việc phù hợp với bạn là: {recommend.name}</span>
                                </div>
                                <div className={cx('chat-message', 'me')}>
                                    <span>
                                        Mức lương trung bình đối với vị trí này là: {recommend.salary} triệu VNĐ
                                    </span>
                                </div>
                                <div className={cx('chat-message', 'me')}>
                                    <span>
                                        Các kỹ năng chuyên môn yêu cầu đối với công việc này:
                                        <br />
                                        {recommend.requirements.map((require, index) => (
                                            <React.Fragment key={index}>
                                                {require}
                                                <br />
                                            </React.Fragment>
                                        ))}
                                    </span>
                                </div>
                                <div className={cx('chat-message', 'choice')}>
                                    <span onClick={() => setShowSoftSkill(true)}>Yêu cầu về kĩ năng mềm?</span>
                                </div>
                                {showSoftSkill && (
                                    <React.Fragment>
                                        <div className={cx('chat-message', 'me')}>
                                            <span>
                                                Các kỹ năng mềm bạn cần quan tâm đối với công việc này:
                                                <br />
                                                {jobs.soft_skill.map((skill, index) => (
                                                    <React.Fragment key={index}>
                                                        {skill}
                                                        <br />
                                                    </React.Fragment>
                                                ))}
                                            </span>
                                        </div>
                                        <div className={cx('chat-message', 'choice')}>
                                            <span onClick={() => setShowPromotion(true)}>Cơ hội thăng tiến?</span>
                                        </div>
                                        {showPromotion && (
                                            <React.Fragment>
                                                <div className={cx('chat-message', 'me')}>
                                                    <span>
                                                        Lĩnh vực công nghệ thông tin là một trong những lĩnh vực đang
                                                        phát triển mạnh mẽ và có nhiều cơ hội thăng tiến cho những người
                                                        làm việc trong ngành này. Dưới đây là một số cơ hội thăng tiến
                                                        phổ biến trong lĩnh vực này:
                                                        <br />
                                                        {jobs.promotion.map((promotion, index) => (
                                                            <React.Fragment key={index}>
                                                                {promotion}
                                                                <br />
                                                            </React.Fragment>
                                                        ))}
                                                    </span>
                                                </div>
                                                <div className={cx('chat-message', 'me')}>
                                                    <span>Bạn có muốn tiếp tục không?</span>
                                                </div>

                                                <div className={cx('field-list')}>
                                                    <div className={cx('chat-message', 'choice')}>
                                                        <span
                                                            onClick={() => {
                                                                if (!stopService) {
                                                                    setContinued(true);
                                                                    setClickedSubmit(true);
                                                                }
                                                            }}
                                                        >
                                                            Có
                                                        </span>
                                                    </div>
                                                    <div className={cx('chat-message', 'choice')}>
                                                        <span
                                                            onClick={() => {
                                                                if (!stopService) {
                                                                    setContinued(false);
                                                                    setClickedSubmit(true);
                                                                    setStopService(true);
                                                                }
                                                            }}
                                                        >
                                                            Không
                                                        </span>
                                                    </div>
                                                </div>

                                                {clickedSubmit && continued && (
                                                    <React.Fragment>
                                                        <div className={cx('chat-message', 'me')}>
                                                            <span>{jobs.category_question.content}</span>
                                                        </div>
                                                        <div className={cx('field-list')}>
                                                            {jobs.category_question.answers.map((choice) => (
                                                                <div
                                                                    className={cx('chat-message', 'choice')}
                                                                    key={choice.id}
                                                                >
                                                                    <span
                                                                        onClick={() => handleChoseSubCaredField(choice)}
                                                                    >
                                                                        {choice.choice_content}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        {subCaredField.length > 0 && (
                                                            <MainField
                                                                field={subCaredField[subCaredField.length - 1]}
                                                            />
                                                        )}
                                                    </React.Fragment>
                                                )}
                                                {clickedSubmit && !continued && (
                                                    <div className={cx('chat-message', 'me')}>
                                                        <span>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</span>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        )}
                                    </React.Fragment>
                                )}
                            </React.Fragment>
                        ))}
                <div ref={messageBody} />
            </React.Fragment>
        );
    };

    const RecommendWithTwoLevels = ({ field }) => {
        const [mainContent, setMainContent] = useState({});

        useEffect(() => {
            scrollToBottom();
        }, [mainContent]);

        const ChoiceItem = ({ item }) => {
            return (
                <div className={cx('chat-message', 'choice')}>
                    <span onClick={() => setMainContent(item)}>{item.choice_content}</span>
                </div>
            );
        };

        return (
            <React.Fragment>
                <div className={cx('chat-message', 'me')}>
                    <span>{field.entry_question.content}</span>
                </div>
                <div className={cx('field-list')}>
                    {field.entry_question.choices.map((choice_field) => (
                        <ChoiceItem item={choice_field} key={choice_field.id} />
                    ))}
                </div>
                {mainContent?.entry_question ? (
                    <React.Fragment>
                        <div className={cx('chat-message', 'me')}>
                            <span>{mainContent.entry_question.content}</span>
                        </div>
                        <div className={cx('field-list')}>
                            {mainContent.entry_question.choices.map((choice_field) => (
                                <ChoiceItem item={choice_field} key={choice_field.id} />
                            ))}
                        </div>
                    </React.Fragment>
                ) : (
                    Object.keys(mainContent).length > 0 && <RecommendWithOneLevel field={mainContent} />
                )}
                <div ref={messageBody} />
            </React.Fragment>
        );
    };

    const RecommendWithMoreLevels = ({ field }) => {
        const [mainContent, setMainContent] = useState({});
        const [subContent, setSubContent] = useState({});

        useEffect(() => {
            scrollToBottom();
        }, [mainContent, subContent]);

        const ChoiceItem = ({ item, type }) => {
            return (
                <div className={cx('chat-message', 'choice')}>
                    <span onClick={() => (type === 'main' ? setMainContent(item) : setSubContent(item))}>
                        {item.choice_content}
                    </span>
                </div>
            );
        };

        return (
            <React.Fragment>
                <div className={cx('chat-message', 'me')}>
                    <span>{field.category_question.content}</span>
                </div>
                <div className={cx('field-list')}>
                    {field.category_question.answers.map((choice_field) => (
                        <ChoiceItem item={choice_field} key={choice_field.id} type="main" />
                    ))}
                </div>
                {Object.keys(mainContent).length > 0 && mainContent?.questions ? (
                    <RecommendWithOneLevel field={mainContent} />
                ) : (
                    mainContent?.category_question && (
                        <React.Fragment>
                            <div className={cx('chat-message', 'me')}>
                                <span>{mainContent.category_question.content}</span>
                            </div>
                            <div className={cx('field-list')}>
                                {mainContent.category_question.answers.map((choice_field) => (
                                    <ChoiceItem item={choice_field} key={choice_field.id} type="sub" />
                                ))}
                            </div>
                            {subContent?.questions && <RecommendWithOneLevel field={subContent} />}
                        </React.Fragment>
                    )
                )}
                <div ref={messageBody} />
            </React.Fragment>
        );
    };

    const MainField = ({ field }) => {
        const isIncludeOneLevel = field?.questions ? true : false;
        const isIncludeTwoLevels = field?.entry_question ? true : false;
        const isInCludeMoreLevels = field?.category_question ? true : false;

        if (isIncludeOneLevel) {
            return <RecommendWithOneLevel field={field} />;
        }
        if (isIncludeTwoLevels) {
            return <RecommendWithTwoLevels field={field} />;
        }
        if (isInCludeMoreLevels) {
            return <RecommendWithMoreLevels field={field} />;
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('close-main-btn')} onClick={() => open(false)}>
                <FontAwesomeIcon icon={faXmark} size='sm' />
            </div>
            <div className={cx('chat-content')}>
                <div className={cx('chat-message', 'me')}>
                    <span>{jobs?.intro_question}</span>
                </div>

                {departments.length > 0 && (
                    <div className={cx('field-list')}>
                        {departments.map((department) => (
                            <div className={cx('chat-message', 'choice')} key={department.id}>
                                <span onClick={() => handleChoseDepartment(department)}>
                                    {department.department_name}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {Object.keys(chosedDepartment).length > 0 && (
                    <div className={cx('chat-message', 'me')}>
                        <span>{jobs.category_question.content}</span>
                    </div>
                )}

                {allMessages.length >= 3 && (
                    <div className={cx('field-list')}>
                        {jobs.category_question.answers.map((choice) => (
                            <div className={cx('chat-message', 'choice')} key={choice.id}>
                                <span onClick={() => handleChoseCaredField(choice)}>{choice.choice_content}</span>
                            </div>
                        ))}
                    </div>
                )}

                {caredField.length > 0 && <MainField field={caredField[caredField.length - 1]} />}

                <div ref={messageBody} />
            </div>
            {/* <div className={cx('chat-area-text')}>
                <input
                    type="text"
                    className={cx('chat-input')}
                    placeholder="Nhập nội dung tin nhắn..."
                    value={message}
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <div className={cx('btn-send')} onClick={() => sendMessage()} />
            </div> */}
        </div>
    );
};
