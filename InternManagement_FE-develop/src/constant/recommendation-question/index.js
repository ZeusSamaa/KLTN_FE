export const RECOMMENDATION_QUESTIONS = {
    description: 'job_recommendation',
    intro_question: 'Hiện tại bạn đang học tập ở ngành học nào?',
    category_question: {
        content: 'Bạn có đam mê với điều gì trong lĩnh vực Công nghệ thông tin?',
        answers: [
            {
                id: 1,
                choice_content: 'Hệ thống',
                entry_question: {
                    content: 'Bạn muốn làm việc trực tiếp với toàn bộ hệ thống hay liên quan tới dữ liệu?',
                    choices: [
                        {
                            id: 1,
                            choice_content: 'Toàn bộ hệ thống',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn muốn làm trong tổ chức vừa và nhỏ hay tổ chức lớn với hệ thống ở mức chuyên sâu?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Tổ chức vừa và nhỏ',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Tổ chức lớn với hệ thống chuyên sâu',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn có khả năng quản lý, giải quyết sự cố và sử dụng các công cụ quản lý hệ thống không?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Có',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Không',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Bạn có định hướng đến tìm hiểu thêm về mạng máy tính và các dịch vụ liên quan hay không?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Có',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Không',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Kỹ sư quản trị hệ thống',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 17,
                                    requirements: [
                                        '- Kiến thức về hệ điều hành: Windows, Linux, Unix, và Mac OS, bao gồm việc cài đặt, cấu hình, bảo trì và khắc phục sự cố',
                                        '- Kiến thức về mạng: Các phương thức mạng, giao thức và cấu hình thiết bị mạng',
                                        '- Kiến thức về bảo mật: Các kỹ thuật bảo mật mạng, bảo mật dữ liệu và bảo vệ hệ thống khỏi các cuộc tấn công từ bên ngoài',
                                        '- Kỹ năng quản lý dịch vụ: Kỹ sư quản trị hệ thống cần phải có kỹ năng quản lý dịch vụ, bao gồm việc triển khai, cấu hình và bảo trì các ứng dụng và dịch vụ trên hệ thống',
                                        '- Kỹ năng giải quyết sự cố: Khả năng phân tích và giải quyết các vấn đề kỹ thuật liên quan đến hệ thống và mạng',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Kỹ sư hệ thống thông tin',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 17,
                                    requirements: [
                                        '- Hệ điều hành Linux, Unix, Debian hoặc Ubuntu',
                                        '- Kiến thức về mạng máy tính và vận hành ở cấp ứng dụng',
                                        '- Thiết lập phần mềm phục vụ quy trình tự động hóa',
                                        '- Công nghệ ảo hóa, tự động hóa',
                                        '- Quản trị mạng, quản lý hiệu suất và giám sát hệ thống',
                                        '- Hệ thống bảo mật',
                                        '- Hệ thống lưu trữ',
                                        '- Điện toán đám mây',
                                        '- Kỹ năng lập trình',
                                        '- Kỹ năng bảo mật thông tin',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            choice_content: 'Liên quan tới dữ liệu',
                            entry_question: {
                                content: 'Bạn muốn tìm hiểu về mảng nào đối với dữ liệu?',
                                choices: [
                                    {
                                        id: 1,
                                        choice_content: 'Quản lý dữ liệu',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn muốn làm việc với toàn bộ dữ liệu của một tổ chức hay chỉ tập trung vào quản lý, bảo trì cơ sở dữ liệu cụ thể?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Toàn bộ dữ liệu của một tổ chức',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Quản lý, bảo trì cơ sở dữ liệu cụ thể',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Giữa công việc lưu trữ, bảo mật và thiết kế, triển khai. Bạn ưu tiên chọn công việc nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Lưu trũ, bảo mật',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Thiết kế, triển khai',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Đối với dữ liệu, bạn chọn cách tối ưu hóa sử dụng dữ liệu hay tập trung vào cung cấp và quản lý dữ liệu?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Tối ưu hóa sử dụng dữ liệu',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Cung cấp và quản lý dữ liệu',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Quản lý dữ liệu',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 13,
                                                requirements: [
                                                    '- Kiến thức về Cơ sở dữ liệu',
                                                    '- Kỹ năng thiết kế Cơ sở dữ liệu',
                                                    '- Kỹ năng quản lý Cơ sở dữ liệu',
                                                    '- Kỹ năng sử dụng các công cụ quản lý Cơ sở dữ liệu',
                                                    '- Kỹ năng bảo mật dữ liệu',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Chuyên viên quản trị cơ sở dữ liệu',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 23,
                                                requirements: [
                                                    '- Kiến thức về cơ sở dữ liệu',
                                                    '- Kỹ năng thiết kế CSDL: xác định yêu cầu, lập kế hoạch, thiết kế phân cấp dữ liệu, thiết kế bảng và quan hệ giữa các bảng, …',
                                                    '- Kỹ năng triển khai cơ sở dữ liệu: cài đặt và cấu hình cơ sở dữ liệu',
                                                    '- Kỹ năng bảo trì và quản trị cơ sở dữ liệu',
                                                    '- Kỹ năng bảo mật cơ sở dữ liệu',
                                                    '- Kỹ năng đánh giá và xử lý sự cố: phát hiện và giải quyết các sự cố CSDL',
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        choice_content: 'Phân tích dữ liệu',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn muốn làm trong tổ chức vừa và nhỏ hay tổ chức lớn với dữ liệu phức tạp?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Tổ chức vừa và nhỏ',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Tổ chức lớn với dữ liệu phức tạp',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Bạn muốn làm một công việc yêu cầu cao về toán học, thống kê và kỹ năng về lập trình không?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Có',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Không',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Bạn tập trung vào các giải pháp cho vấn đề kinh doanh hay các giải pháp phức tạp cho các vấn đề cụ thể?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Vấn đề kinh doanh',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Vấn đề cụ thể',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Chuyên viên phân tích dữ liệu',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 18,
                                                requirements: [
                                                    '- Kiến thức về dữ liệu và Cơ sở dữ liệu',
                                                    '- Kỹ năng thu thập dữ liệu',
                                                    '- Kỹ năng xử lý và tiền xử lý dữ liệu',
                                                    '- Kỹ năng phân tích dữ liệu: tìm ra các mẫu, xu hướng và thông tin hữu ích từ dữ liệu',
                                                    '- Kỹ năng sử dụng các công cụ phân tích dữ liệu: Excel, Tableau, R, Python, …',
                                                    '- Kỹ năng trực quan hóa dữ liệu',
                                                    '- Kỹ năng đưa ra dự đoán và mô hình hóa dữ liệu',
                                                    '- Kỹ năng truyền thông',
                                                    '- Kỹ năng đề xuất và tư vấn',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Chuyên viên khoa học dữ liệu',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 25,
                                                requirements: [
                                                    '- Kiến thức về khoa học dữ liệu: phương pháp phân tích dữ liệu, mô hình hóa dữ liệu',
                                                    '- Kỹ năng xử lý dữ liệu lớn: lưu trữ dữ liệu, xử lý dữ liệu trên các nền tảng đám mây, và sử dụng các công cụ xử lý dữ liệu như Apache Hadoop, Spark, …',
                                                    '- Kỹ năng trực quan hóa dữ liệu',
                                                    '- Kỹ năng mô hình hóa dữ liệu',
                                                    '- Kỹ năng phân tích và trình bày kết quả',
                                                    '- Kỹ năng tối ưu hóa mô hình',
                                                    '- Kỹ năng sử dụng các công cụ phân tích dữ liệu: sử dụng các công cụ như Jupyter Notebook, Spyder, Rstudiom, …',
                                                    '- Kỹ năng đọc hiểu và xử lý văn bản',
                                                    '- Kỹ năng phân tích dữ liệu đa ngành',
                                                    '- Kỹ năng đề xuất và tư vấn',
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                id: 2,
                choice_content: 'AI',
                entry_question: {
                    content: 'Bạn muốn định hướng nghiên cứu chuyên sâu về lý thuyết và thuật toán AI?',
                    choices: [
                        {
                            id: 1,
                            choice_content: 'Có',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content: 'Giữa nghiên cứu và triển khai ứng dụng, bạn định hướng như thế nào?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Nghiên cứu',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Triển khai ứng dụng',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn muốn tìm hiểu sâu về một lĩnh vực cụ thể hay ở phạm vi rộng hơn ở AI?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Có',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Không',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Bạn có yêu thích công việc truyền tài những kiến thức về AI ở giảng đường không?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Có',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Không',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Kỹ sư Machine Learning',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 25,
                                    requirements: [
                                        '- Kiến thức về các thuật toán và phương pháp của machine learning: supervised learning, unsupervised learning, reinforcement learning, deep learning và các kỹ thuật tối ưu hóa',
                                        '- Kỹ năng triển khai các giải pháp machine learning sử dựng các ngôn ngữ lập trình như Python, R, Java, C++ và MATLAB',
                                        '- Kiến thức về các công cụ và thư viện machine learning như Scikit-learn, TensorFlow, Keras, PyTorch và Apache Spark',
                                        '- Kỹ năng phân tích và xử lý dữ liệu để chuẩn bị cho quá trình huấn luyện mô hình machine learning',
                                        '- Kỹ năng sử dụng các kỹ thuật tối ưu hóa để cải thiện hiệu suất và tốc độ của mô hình machine learning',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Chuyên viên AI',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 25,
                                    requirements: [
                                        '- Kiến thức về các lĩnh vực cơ bản của trí tuệ nhân tạo như học máy, xử lý ngôn ngữ tự nhiên, thị giác máy tính',
                                        '- Kỹ năng lập trình và phát triển các giải pháp trí tuệ nhân tạo sử dụng các ngôn ngữ lập trình như Python, Java, C++, …',
                                        '- Kiến thức về các công cụ và thư viện trí tuệ nhân tạo như TensorFlow, Keras, PyTorch, OpenCV',
                                        '- Kỹ năng phát triển và triể khai các mô hình trí tuệ nhân tạo trên các nền tảng đám mây như AWS, GCP, Microsoft Azure',
                                        '- Kỹ năng phân tích và giải quyết các vấn đề thực tế liên quan đến trí tuệ nhân tạo',
                                        '- Kiến thức về các tiêu chuẩn và quy trình kiểm tra, đánh giá và bảo trì các hệ thống trí tuệ nhân tạo',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            choice_content: 'Không',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn muốn định hướng vào phân tích dữ liệu lớn hay tập trung vào xây dựng hệ thống thông minh có khả năng học tập và ra quyết định?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Phân tích dữ liệu lớn',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Xây dựng hệ thống thông minh',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn đã có kĩ năng sử dụng các công cụ phân tích dữ liệu như Hadoop, Spark, NoSQL chưa?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Đã có kinh nghiệm',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Chưa từng nghe đến',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Mục đích của bạn là phân tích và đưa ra quyết định dựa trên dữ liệu hay tạo ra hệ thống thực hiện các tác vụ và đưa ra quyết định chính xác hơn?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Phân tích và đưa ra quyết định dựa trên dữ liệu',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Tạo ra hệ thống thực hiện các tác vụ và đưa ra quyết định',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Kỹ sư Big Data',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 27,
                                    requirements: [
                                        '- Kiến thức về các công nghệ và hệ thống lưu trũ dữ liệu như Hadoop, Spark, NoSQL, SQL, ... và các công nghệ đám mây như Amazon Web Services (AWS), Microsoft Azure và Google Cloud Platform',
                                        '- Kỹ năng thiết kế và triển khai các hệ thống big data để xử lý, lưu trữ và phân tích các tập dữ liệu lớn',
                                        '- Kiến thức về các kỹ thuật và công cụ phân tích dữ liệu như xử lý ngôn ngữ tự nhiên, máy học, khai phá dữ liệu và trích xuất thông tin',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Kỹ sư AI',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 18,
                                    requirements: [
                                        '- Kiến thức lập trình và thuật toán: Chuyên sâu về ngôn ngữ lập trình Python, C++, Java và các thuật toán như học máy, học sâu, xử lý ngôn ngữ tự nhiên và thị giác máy tính',
                                        '- Kiến thức về mạng nơ-ron: Các mô hình mạng nơ-ron như mạng nơ-ron sâu, mạng nơ-ron tích chập và mạng nơ-ron tái cấu trúc',
                                        '- Kiến thức về xử lý ngôn ngữ tự nhiên: Phân tích cú háp, cảm xúc và dịch máy',
                                        '- Kiến thức về thị giác máy tính: Nhận diện khuôn mặ, giám sát và phân tích hành vi, phát hiện vật thể',
                                        '- Kỹ năng xử lý dữ liệu: Khả năng lưu trữ, truy xuất và xử lý dữ liệu (Hadoop, Spark, …)',
                                        '- Kỹ năng tối ưu và tinh chỉnh mô hình: Đánh giá và tinh chỉnh tham số của mô hình',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
            {
                id: 3,
                choice_content: 'Thương mại',
                agreements: 0,
                disagreemets: 0,
                questions: [
                    {
                        id: 1,
                        content:
                            'Giữa việc phát triển chiến lược kinh doanh, quản lý hoạt động kinh doanh trực tuyến và quản lý, bảo trì hệ thống giao dịch trực tuyến, bạn yêu thích công việc nào hơn?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Phát triển chiến lược kinh doanh, quản lý hoạt động kinh doanh',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Quản lý, bảo trì hệ thống giao dịch trực tuyến',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        content: 'Bạn có kiến thức về Marketing, phân tích chiến lược kinh doanh không?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Có',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Không',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        content:
                            'Với việc phân tích dữ liệu và bảo trì, xử lý sự cố của hệ thống, bạn ưu tiên công việc nào?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Phân tích dữ liệu',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Bảo trì, xử lý sự cố hệ thống',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 4,
                        content:
                            'Đối với khách hàng, bạn muốn tương tác, xây dựng thêm mối quan hệ hay chỉ tập trung vào hệ thống giao dịch để đáp ứng nhu cầu khách hàng?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Tương tác, xây dựng thêm mối quan hệ',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Hệ thống giao dịch để đáp ứng nhu cầu',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 5,
                        content:
                            'Bạn có kinh nghiệm trong các công cụ kinh doanh trực tuyến hay công cụ quản trị hệ thống?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Có kinh nghiệm',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Chưa có kinh nghiệm',
                                is_agreed: false,
                            },
                        ],
                    },
                ],
                job_recommendations: [
                    {
                        id: 1,
                        name: 'Chuyên viên kinh doanh trực tuyến',
                        min_agreements: 3,
                        max_agreements: 5,
                        salary: 13,
                        requirements: [
                            '- Kiến thức về thị trường kinh doanh trực tuyến: xu hướng, các sản phẩm và dịch vụ được yêu thích, các mô hình kinh doanh trực tuyến, …',
                            '- Kỹ năng phân tích thị trường',
                            '- Kỹ năng quảng cáo và tiếp thị trực tuyến: kênh quảng cáo, chiến lược quảng cáo, chiến lược tiếp thị email, …',
                            '- Kỹ năng tối ưu hóa công cụ tìm kiếm (SEO)',
                            '- Kỹ năng phân tích dữ liệu và đo lường hiệu quả',
                            '- Kỹ năng quản lý dự án',
                            '- Kỹ năng xây dựng mối quan hệ khách hàng: tạo ra các chương trình khuyến mãi, dịch vụ chăm sóc khách hàng, …',
                            '- Kỹ năng sáng tạo và phát triển phần mềm',
                        ],
                    },
                    {
                        id: 2,
                        name: 'Chuyên viên quản trị hệ thống giao dịch trực tuyến',
                        min_agreements: 0,
                        max_agreements: 2,
                        salary: 15,
                        requirements: [
                            '- Kiến thức về hệ thống giao dịch trực tuyến',
                            '- Kỹ năng quản lý dữ liệu: thiết lập, cập nhật và bảo mật dữ liệu khách hàng và giao dịch',
                            '- Kỹ năng quản lý hệ thống: cài đặt, cấu hình, giám sát và bảo trì hệ thống',
                            '- Kỹ năng phát triển hệ thống: thiết kế và triển khai các tính năng mới, nâng cấp hệ thống, …',
                            '- Kỹ năng phân tích và giải quyết sự cố',
                            '- Kỹ năng quản lý dự án',
                            '- Kỹ năng sáng tạo và đổi mới',
                        ],
                    },
                ],
            },
            {
                id: 4,
                choice_content: 'Phần mềm',
                category_question: {
                    content: 'Bạn yêu thích lĩnh vực nào trong phát triển phần mềm?',
                    answers: [
                        {
                            id: 1,
                            choice_content: 'Giao diện',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn đã sử dụng ngôn ngữ lập trình Swift hay Kotlin để phát triển ứng dụng chưa?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Đã sử dụng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Chưa sử dụng',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn hay thao tác thường xuyên trên website ở các thiết bị có kích thước lớn hay trên thiết bị di động nhỏ hơn?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Thiết bị di động',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Thiết bị có kích thước lớn',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Giữa phát triển ứng dụng Website và ứng dụng di động, bạn lựa chọn cái nào?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Ứng dụng đi dộng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Ứng dụng Website',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Lập trình viên Frontend Mobile',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 20,
                                    requirements: [
                                        '- Kiến thức về lập trình di động: Ngôn ngữ lập trình di động như Swift hoặc Kotlin',
                                        '- Kiến thức về UI/UX: Đảm bảo về thiết kế (UI) và trải nghiệm người dùng (UX)',
                                        '- Kiến thức về các Frameworks: Các framework như React Native hoặc Flutter để tạo tính năng và tối ưu hóa hiệu suất của ứng dụng di động',
                                        '- Kiến thức về Responsive Design: Đảm bảo ứng dụng di động hoạt động trên nhiều thiết bị khác nhau, sử dụng các kỹ thuật như media queries, grid system và flexible images',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Lập trình viên Frontend Website',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 20,
                                    requirements: [
                                        '- Kiến thức về HTML, CSS, Javascript',
                                        '- Kỹ năng sử dụng các Framwork như React, Angular, Vue.js, Bootstrap, Foundation và Material Design',
                                        '- Khả năng thiết kế giao diện người dùng đẹp mắt, dễ sử dụng và có trải nghiệm tốt ',
                                        '- Kỹ năng phân tích và hiểu các yêu cầu và mục tiêu của ứng dụng để phát triển giao diện người dùng phù hợp',
                                        '- Hiểu biết về UI/UX design và các nguyên tắc của thiết ké giao diện người dùng',
                                        '- Kỹ năng tối ưu hóa các trang web hoặc ứng dụng di động ',
                                        '- Kỹ năng tương tác với Backend, Designer và quản lý dự án',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            choice_content: 'Dữ liệu',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn muốn tập trung vào phát triển và thiết kế hệ thống hay tập trung vào quản lý và triển khai hệ thống?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Phát triển và thiết kế hệ thống',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Quản lý và triển khai hệ thống',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn có kỹ năng về phát triển, quản lý các thành phần Backend của ứng dụng hay quản lý, triển khai cơ sở hạ tầng phục vụ cho ứng dụng?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Các thành phần Backend của ứng dụng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Cơ sở hạ tầng phục vụ cho ứng dụng',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Giữa làm việc trực tiếp với các nhà phát triển và quản trị hệ thống, bạn ưu tiên chọn cái nào?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Nhà phát triển',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Quản trị hệ thống',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Lập trình viên Backend',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 23,
                                    requirements: [
                                        '- Kiến thức về ngôn ngữ lập trình: Java, Python, Ruby, PHP, NodeJS, …',
                                        '- Kỹ năng thiết kế và triển khai các CSDL quan hệ và phi quan hệ như MySQL, MongoDB, PostgreSQL, Oracle và SQL Server',
                                        '- Kỹ năng phát triể các ứng dụng web và di động dựa trên các framework và thư viện như Flask, Django, Rails, Laravel và Express.js',
                                        '- Hiểu biết sâu rộng về các giao thức công nghệ web như HTTP, TCP/IP, REST, SOAP, GraphQL, WebSocket và Oauth',
                                        '- Kỹ năng tối ưu hóa hiệu suất của hệ thống',
                                        '- Kỹ năng bảo mật hệ thống và ứng dụng',
                                        '- Khả năng sử dụng các công cụ và phần mềm quản lý mã nguồn như Git, SVN',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Kỹ sư DevOps',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 33,
                                    requirements: [
                                        '- Hiểu biết về quy trình phát triể phần mềm và quản lý dự án Agile, Scrum, Kanban và DevOps',
                                        '- Kỹ năng sử dụng các công cụ và kỹ thuật như Git, Jenkins, Ansible, Docker',
                                        '- Hiểu biết về mạng và bảo mật, bao gồm cả kiến thức về giao thức như TCP/IP, HTTP, HTTPS, SSL/TLS và các công nghệ bảo mật như Oauth2 và OpenID Connect',
                                        '- Kỹ năng tối ưu hóa hiệu suất, độ tin cậy',
                                        '- Kỹ năng giải quyết vấn đề và tìm kiếm các giải pháp sáng tạo',
                                        '- Khả năng kiểm tra và phân tích các dữ liệu và thông tin',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 3,
                            choice_content: 'Phần cứng',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn định hướng phát triển trên hệ thống mainframe (máy tính lớn) hay trên các sản phẩm nhúng như điện thoại thông minh, máy tính bảng, …?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Hệ thống mainframe',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Sản phẩm nhúng',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'So với các ngôn ngữ lập trình COBOL, PL/I, Assembler; khi được lựa chọn với phát triển bằng ngôn ngữ lập trình C, C++, Java, Python … Bạn sẽ chọn cái nào?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'COBOL, PL/I, Assembler',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'C, C++, Java, Python',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Bạn muốn phát triển các ứng dụng nội bộ cho doanh nghiệp hay các sản phẩm IoT?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Ứng dụng nội bộ',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Sản phẩm IoT',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Nhà phát triển MainFrame',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 30,
                                    requirements: [
                                        '- Kiến thức về hệ thống MainFrame: hệ điều hành z/OS, phần mềm quản lý tài nguyên MainFrame như CICS, IMS, DB2, …',
                                        '- Ngôn ngữ lập trình COBOL, PL/I, Assembler, …',
                                        '- Kỹ năng phát triển ứng dụng',
                                        '- Kỹ năng sử dụng các công cụ và framework: IBM Rational Developer, …',
                                        '- Kỹ năng thiết kế hệ thống',
                                        '- Kỹ năng kiểm thử và debugging',
                                        '- Kỹ năng tối ưu hóa và bảo mật',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Kỹ sư phần mềm nhúng',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 22,
                                    requirements: [
                                        '- Kiến thức về vi xử lý và hệ thống nhúng',
                                        '- Kỹ năng lập trình nhúng: ngôn ngữ lập trình',
                                        '- Kỹ năng thiết kế phần cứng: thiết kế mạch, thiết kế vi mạch, …',
                                        '- Kỹ năng phát triển phần mềm nhúng',
                                        '- Kỹ năng sử dụng các công cụ phát triển phần mềm nhúng',
                                        '- Kỹ năng kiểm thử phần mềm nhúng',
                                        '- Kỹ năng tương tác với phần cứng',
                                        '- Kỹ năng đánh giá và tối ưu hiệu suất hệ thống nhúng',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 4,
                            choice_content: 'Chất lượng phần mềm',
                            category_question: {
                                content:
                                    'Bạn muốn làm công việc liên quan đến đảm bảo chất lượng của quá trình phát triển phần mềm hay thực hiện các thử nghiệm để đảm bảo chất lượng phần mềm?',
                                answers: [
                                    {
                                        id: 1,
                                        choice_content: 'Đảm bảo chất lượng',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn thường tập trung vào quá trình phát triển phần mềm hay sản phẩm phần mềm?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Quá trình phát triển phần mềm',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Sản phẩm phần mềm',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Giữa việc đảm bảo chất lượng quy trình, kiểm tra phân tích và kiểm tra sản phẩm phần mềm, sửa chữa các lỗi, bạn ưu tiên chọn công việc nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Đảm bảo chất lượng quy trình',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Kiểm tra sản phẩm phần mềm',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Bạn muốn làm việc với vai trò kỹ sư phần mềm hay chuyên gia kiểm thử?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Kỹ sư phần mềm',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Chuyên gia kiểm thử',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Quality Assurance',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 20,
                                                requirements: [
                                                    '- Kiến thức về phân tích yêu cầu: Chuyên viên QA cần phải có kiến thức về phân tích yêu cầu của khách hàng và hiểu được các yêu cầu cần thiết để phát triển sản phẩm.',
                                                    '- Kiểm thử và sửa lỗi: Chuyên viên QA có nhiệm vụ kiểm tra sản phẩm để đảm bảo tính ổn định và chất lượng của sản phẩm. Họ cũng phải tìm lỗi và báo cáo về các lỗi đó cho nhóm phát triển để sửa chữa.',
                                                    '- Kiến thức về kiểm thử tự động: Chuyên viên QA cần phải có kiến thức về kiểm thử tự động, để đảm bảo hiệu quả và tiết kiệm thời gian trong quá trình kiểm thử sản phẩm.',
                                                    '- Kiến thức về kiểm thử chức năng: Chuyên viên QA cần phải hiểu các tiêu chuẩn kiểm thử chức năng và có kỹ năng kiểm thử đầy đủ các tính năng của sản phẩm.',
                                                    '- Kiến thức về kiểm thử hiệu suất: Chuyên viên QA cần phải hiểu các tiêu chuẩn kiểm thử hiệu suất và có kỹ năng kiểm thử hiệu suất của sản phẩm.',
                                                    '- Kiến thức về kiểm thử bảo mật: Chuyên viên QA cần phải có kiến thức về kiểm thử bảo mật và có kỹ năng kiểm thử bảo mật của sản phẩm.',
                                                    '- Kiến thức về quản lý dự án: Chuyên viên QA cần phải hiểu các quy trình quản lý dự án và có kỹ năng làm việc với các công cụ quản lý dự án như Jira, Trello, hay Asana để phối hợp với các thành viên trong nhóm phát triển.',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Quality Control',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 16,
                                                requirements: [
                                                    '- Kiến thức về quy trình sản xuất: Chuyên viên QC cần có kiến thức về quy trình sản xuất sản phẩm để đảm bảo sản phẩm đáp ứng tiêu chuẩn chất lượng.',
                                                    '- Kiến thức về tiêu chuẩn chất lượng: Chuyên viên QC cần phải hiểu các tiêu chuẩn chất lượng như ISO, GMP, HACCP... để kiểm tra sản phẩm đáp ứng tiêu chuẩn chất lượng.',
                                                    '- Kiến thức về kỹ thuật kiểm tra: Chuyên viên QC cần phải có kiến thức về các phương pháp kiểm tra chất lượng sản phẩm như kiểm tra độ dày, độ cứng, độ bền, độ chính xác, độ đồng nhất, độ ổn định...',
                                                    '- Kỹ năng sử dụng công cụ kiểm tra: Chuyên viên QC cần phải có kỹ năng sử dụng các công cụ kiểm tra chất lượng như máy đo, máy quét, máy phân tích hóa học, phần mềm kiểm tra...',
                                                    '- Kỹ năng phân tích và báo cáo: Chuyên viên QC cần phải có kỹ năng phân tích và báo cáo kết quả kiểm tra chất lượng sản phẩm để đưa ra các giải pháp cải tiến sản phẩm.',
                                                    '- Kỹ năng quản lý: Chuyên viên QC cần phải có kỹ năng quản lý quá trình kiểm tra chất lượng sản phẩm, phối hợp với các bộ phận khác để đảm bảo sản phẩm đáp ứng tiêu chuẩn chất lượng.',
                                                    '- Kỹ năng đào tạo: Chuyên viên QC cần phải có kỹ năng đào tạo và hướng dẫn các nhân viên sản xuất để đảm bảo quy trình sản xuất đáp ứng tiêu chuẩn chất lượng.',
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        choice_content: 'Thực hiện các thử nghiệm',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn thích công việc kiểm tra bằng thủ công hay sử dụng các công cụ tự động hóa?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Thủ công',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Công cụ tự động hóa',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Bạn lựa chọn giữa kiểm tra duy nhất một lần hay lặp đi lặp lại nhiều lần?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Duy nhất một lần',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Lặp đi lặp lại nhiều lần',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Bạn đã có kỹ năng và kinh nghiệm trong việc thực hiện các thử nghiệm bằng cách thủ công hay chưa?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Đã có kinh nghiệm',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Chưa có kinh nghiệm',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Software Tester',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 12,
                                                requirements: [
                                                    '- Kiến thức về quy trình phát triển phần mềm: Chuyên viên kiểm thử phần mềm cần phải nắm vững các quy trình phát triển phần mềm, như Agile, Scrum, Waterfall, để hiểu rõ bản chất của sản phẩm phần mềm cần kiểm thử.',
                                                    '- Kiến thức về kiểm thử phần mềm: Chuyên viên kiểm thử phần mềm cần phải có kiến thức về các phương pháp kiểm thử phần mềm, bao gồm kiểm thử chức năng, kiểm thử hiệu suất, kiểm thử bảo mật, kiểm thử tích hợp, kiểm thử hệ thống, kiểm thử độc lập, kiểm thử tự động...',
                                                    '- Kỹ năng sử dụng các công cụ kiểm thử phần mềm: Chuyên viên kiểm thử phần mềm cần phải có kỹ năng sử dụng các công cụ kiểm thử phần mềm, bao gồm các phần mềm kiểm thử tự động, phần mềm quản lý kiểm thử, phần mềm theo dõi lỗi...',
                                                    '- Kiến thức về lập trình: Chuyên viên kiểm thử phần mềm cần phải hiểu về lập trình để có thể hiểu và đọc được mã nguồn phần mềm, đặc biệt là trong việc kiểm thử tự động.',
                                                    '- Kỹ năng phân tích và báo cáo: Chuyên viên kiểm thử phần mềm cần phải có kỹ năng phân tích kết quả kiểm thử và báo cáo lại cho nhóm phát triển để sửa chữa các lỗi và cải thiện chất lượng sản phẩm.',
                                                    '- Kỹ năng tìm kiếm và sửa lỗi: Chuyên viên kiểm thử phần mềm cần phải có kỹ năng tìm kiếm và sửa lỗi phần mềm, giúp đảm bảo tính ổn định và chất lượng của sản phẩm.',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Automatic Tester',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 15,
                                                requirements: [
                                                    '- Kiến thức về ngôn ngữ lập trình: Chuyên viên kiểm thử tự động cần phải có kiến thức về ít nhất một ngôn ngữ lập trình như Java, Python, C#, Ruby... để có thể viết được mã kiểm thử.',
                                                    '- Kiến thức về các công cụ kiểm thử tự động: Chuyên viên kiểm thử tự động cần phải có kiến thức về các công cụ kiểm thử tự động như Selenium, Appium, Robot Framework, TestComplete... để có thể sử dụng chúng trong quá trình kiểm thử.',
                                                    '- Kỹ năng viết mã kiểm thử tự động: Chuyên viên kiểm thử tự động cần phải có kỹ năng viết mã kiểm thử tự động để kiểm tra các tính năng và chức năng của sản phẩm phần mềm.',
                                                    '- Kiến thức về kỹ thuật kiểm thử tự động: Chuyên viên kiểm thử tự động cần phải có kiến thức về các phương pháp kiểm thử tự động như kiểm thử đơn vị, kiểm thử tích hợp, kiểm thử giao diện, kiểm thử API, kiểm thử hệ thống...',
                                                    '- Kỹ năng sử dụng các công cụ quản lý kiểm thử tự động: Chuyên viên kiểm thử tự động cần phải có kỹ năng sử dụng các công cụ quản lý kiểm thử tự động để quản lý các mã kiểm thử, kết quả kiểm thử, và báo cáo kết quả kiểm thử.',
                                                    '- Kỹ năng phân tích và báo cáo: Chuyên viên kiểm thử tự động cần phải có kỹ năng phân tích kết quả kiểm thử tự động và báo cáo lại cho nhóm phát triển để sửa chữa các lỗi và cải thiện chất lượng sản phẩm.',
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            id: 5,
                            choice_content: 'Quản lý',
                            category_question: {
                                content:
                                    'Bạn muốn phụ trách về công việc giám sát tiến độ thực hiện hay các hoạt động liên quan sản phẩm?',
                                answers: [
                                    {
                                        id: 1,
                                        choice_content: 'Giám sát tiến độ thực hiện',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn muốn quản lý chung các hoạt động trong dự án phát triển hay chỉ trong một nhóm của dự án?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Quản lý chung các hoạt động',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Quản lý một nhóm của dự án',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Giữa công việc đảm bảo dự án thực hiện đúng tiến độ và quản lý các thành viên làm việc hiệu quả, bạn chọn công việc nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Đảm bảo tiến độ',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Quản lý thành viên',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Bạn có khả năng lãnh đạo và đưa ra các quyết định lớn, quản lý các rủi ro không?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Có',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Không',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Project Manager',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 35,
                                                requirements: [
                                                    '- Kiến thức về phương pháp kiểm thử: kiểm thử đơn vị, kiểm thử tích hợp, …',
                                                    '- Kỹ năng lập kế hoạch kiểm thử',
                                                    '- Kỹ năng thiết kế ca kiểm thử',
                                                    '- Kỹ năng thực hiện kiểm thử',
                                                    '- Kỹ năng sử dụng các công cụ kiểm thử',
                                                    '- Kỹ năng đánh giá kết quả kiểm thử',
                                                    '- Kỹ năng lập báo cáo kiểm thử',
                                                    '- Kiến thức về các quy trình phát triển phần mềm: Agile, Waterfall, …',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Team Leader',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 28,
                                                requirements: [
                                                    '- Kiến thức chuyên môn: Team leader IT cần có kiến thức chuyên môn về phát triển phần mềm, kiến trúc hệ thống, quản lý dự án, quản lý thời gian và ngân sách, cũng như các công nghệ và công cụ liên quan đến phát triển phần mềm.',
                                                    '- Kinh nghiệm làm việc: Team leader IT cần có kinh nghiệm trong lãnh đạo và quản lý các dự án phát triển phần mềm. Kinh nghiệm này cần được tích lũy từ các dự án đã thực hiện, từ đó giúp team leader IT có khả năng giải quyết các vấn đề phát sinh và đưa ra quyết định phù hợp.',
                                                    '- Kỹ năng giao tiếp: Team leader IT cần có kỹ năng giao tiếp tốt để có thể truyền đạt thông tin và hướng dẫn công việc một cách rõ ràng và hiệu quả. Kỹ năng này cũng giúp team leader IT có khả năng giải quyết các vấn đề liên quan đến mối quan hệ giữa các thành viên trong nhóm.',
                                                    '- Kỹ năng quản lý: Team leader IT cần có kỹ năng quản lý tốt để có thể lãnh đạo và phân công công việc cho các thành viên trong nhóm. Kỹ năng quản lý cũng giúp team leader IT có khả năng đưa ra quyết định nhanh chóng và chính xác trong các tình huống khó khăn.',
                                                    '- Kỹ năng tổ chức: Team leader IT cần có khả năng tổ chức công việc và quản lý thời gian hiệu quả để đảm bảo tiến độ dự án được hoàn thành đúng hạn và chất lượng sản phẩm đạt yêu cầu.',
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        choice_content: 'Liên quan sản phẩm',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn muốn các công việc liên quan tới kỹ thuật hay liên quan đến sản phẩm?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Liên quan tới kỹ thuật',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Liên quan tới sản phẩm',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Bạn có xu hướng phục cho các thành viên kỹ thuật trong dự án hay cho khách hàng, người dùng cuối?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Các thành viên kỹ thuật',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Khách hàng, người dùng cuối',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content: 'Bạn có các kỹ năng về kỹ thuật, công nghệ chuyên sâu không?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Có',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Không',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Technical Manager',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 60,
                                                requirements: [
                                                    '- Kiến thức chuyên môn: Technical Manager cần có kiến thức chuyên môn về công nghệ, phát triển phần mềm, kiến trúc hệ thống, quản lý dự án, quản lý thời gian và ngân sách, cũng như các công nghệ và công cụ liên quan đến công nghệ thông tin.',
                                                    '- Kinh nghiệm làm việc: Technical Manager cần có kinh nghiệm trong quản lý và phát triển các dự án công nghệ thông tin. Kinh nghiệm này cần được tích lũy từ các dự án đã thực hiện, từ đó giúp Technical Manager có khả năng giải quyết các vấn đề phát sinh và đưa ra quyết định phù hợp.',
                                                    '- Kỹ năng giao tiếp: Technical Manager cần có kỹ năng giao tiếp tốt để có thể truyền đạt thông tin và hướng dẫn công việc một cách rõ ràng và hiệu quả. Kỹ năng này cũng giúp Technical Manager có khả năng giải quyết các vấn đề liên quan đến mối quan hệ giữa các thành viên trong nhóm và giữ liên lạc với các bộ phận khác trong công ty.',
                                                    '- Kỹ năng quản lý: Technical Manager cần có kỹ năng quản lý tốt để có thể lãnh đạo và phân công công việc cho các thành viên trong nhóm. Kỹ năng quản lý cũng giúp Technical Manager có khả năng đưa ra quyết định nhanh chóng và chính xác trong các tình huống khó khăn.',
                                                    '- Kỹ năng tổ chức: Technical Manager cần có khả năng tổ chức công việc và quản lý thời gian hiệu quả để đảm bảo tiến độ dự án được hoàn thành đúng hạn và chất lượng sản phẩm đạt yêu cầu. Kỹ năng tổ chức cũng giúp Technical Manager có khả năng giải quyết các vấn đề liên quan đến quản lý tài nguyên và ngân sách.',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Product Manager',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 45,
                                                requirements: [
                                                    '- Kiến thức chuyên môn: Product Manager cần có kiến thức chuyên môn về thị trường, khách hàng, sản phẩm, quảng cáo, tiếp thị, phân tích dữ liệu và quản lý dự án. Product Manager cần hiểu biết về các công nghệ, các sản phẩm và dịch vụ của công ty, để có thể đưa ra quyết định phù hợp để phát triển sản phẩm.',
                                                    '- Kinh nghiệm làm việc: Product Manager cần có kinh nghiệm trong quản lý và phát triển sản phẩm, kinh nghiệm này cần được tích lũy từ các dự án đã thực hiện và từ các phản hồi từ khách hàng và thị trường. Kinh nghiệm này giúp Product Manager có khả năng giải quyết các vấn đề phát sinh và đưa ra quyết định phù hợp.',
                                                    '- Kỹ năng giao tiếp: Product Manager cần có kỹ năng giao tiếp tốt để có thể truyền đạt thông tin và hướng dẫn công việc một cách rõ ràng và hiệu quả. Kỹ năng này cũng giúp Product Manager có khả năng giải quyết các vấn đề liên quan đến mối quan hệ giữa các thành viên trong nhóm và giữ liên lạc với các bộ phận khác trong công ty.',
                                                    '- Kỹ năng quản lý: Product Manager cần có kỹ năng quản lý tốt để có thể lãnh đạo và phân công công việc cho các thành viên trong nhóm. Kỹ năng quản lý cũng giúp Product Manager có khả năng đưa ra quyết định nhanh chóng và chính xác trong các tình huống khó khăn.',
                                                    '- Kỹ năng tổ chức: Product Manager cần có khả năng tổ chức công việc và quản lý thời gian hiệu quả để đảm bảo tiến độ dự án được hoàn thành đúng hạn và chất lượng sản phẩm đạt yêu cầu. Kỹ năng tổ chức cũng giúp Product Manager có khả năng giải quyết các vấn đề liên quan đến quản lý tài nguyên và ngân sách.',
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                        {
                            id: 6,
                            choice_content: 'Lựa chọn khác',
                            category_question: {
                                content: 'Bạn muốn phát triển ứng dụng website, di động hay là game?',
                                answers: [
                                    {
                                        id: 1,
                                        choice_content: 'Website',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Bạn lựa chọn giữa quản lý, duy trì trang web hay phát triển trang web từ đầu đến cuối?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Quản lý, duy trì trang web',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Phát triển trang web',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Bạn có kiến thức về lập trình, các ngôn ngữ lập trình và công nghệ Web như Angular, React, Node.js, … không?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Không',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Có',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Giữa việc đảm bảo chất lượng, hiệu quả trang web và xây dựng trang web, bạn chọn cái nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Đảm bảo chất lượng, hiệu quả trang web',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Xây dựng trang web',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Nhân viên quản trị Website',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 15,
                                                requirements: [
                                                    '- Kiến thức về quản trị website: quy trình quản trị, quản lý nội dung, …',
                                                    '- Kiến thức về thiết kế web: giao diện, trải nghiệm người dùng, …',
                                                    '- Kỹ năng lập kế hoạch và quản lý nội dung',
                                                    '- Kỹ năng SEO',
                                                    '- Kỹ năng phân tích dữ liệu',
                                                    '- Kỹ năng tương tác với khách hàng',
                                                    '- Kỹ năng phân tích thị trường',
                                                    '- Kỹ năng quảng cáo trực tuyến',
                                                    '- Kỹ năng sử dụng các công cụ phân tích và quản lý website',
                                                    '- Kỹ năng lập kế hoạch và triển khai chiến lược marketing',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Lập trình Fullstack Website',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 30,
                                                requirements: [
                                                    '- Kiến thức về HTML, CSS, Javascript',
                                                    '- Kỹ năng sử dụng các Framwork như React, Angular, Vue.js, Bootstrap, Foundation và Material Design',
                                                    '- Kiến thức về ngôn ngữ lập trình: Java, Python, Ruby, PHP, NodeJS, …',
                                                    '- Kỹ năng thiết kế và triển khai các CSDL quan hệ và phi quan hệ như MySQL, MongoDB, PostgreSQL, Oracle và SQL Server',
                                                    '- Kỹ năng phát triể các ứng dụng web và di động dựa trên các framework và thư viện như Flask, Django, Rails, Laravel và Express.js',
                                                    '- Hiểu biết sâu rộng về các giao thức công nghệ web như HTTP, TCP/IP, REST, SOAP, GraphQL, WebSocket và Oauth',
                                                    '- Kỹ năng tối ưu hóa hiệu suất của hệ thống',
                                                    '- Kỹ năng bảo mật hệ thống và ứng dụng',
                                                    '- Khả năng sử dụng các công cụ và phần mềm quản lý mã nguồn như Git, SVN',
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 2,
                                        choice_content: 'Di động',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content:
                                                    'Hiện tại bạn đang sử dụng thiết bị di dộng sử dụng hệ điều hành Android hay iOS?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Hệ điều hành Android',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Hệ điều hành iOS',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Việc phát triển trên 2 nền tảng này, bạn yêu thích sử dụng nền tảng nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Android',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'iOS',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Bạn có kỹ năng lập trình với ngôn ngữ Java, Kotlin hay Swift, Objective-C?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Java, Kotlin',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Swift, Objective-C',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Lập trình viên Android',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 22,
                                                requirements: [
                                                    '- Kiến thức chuyên sâu về Java hoặc Kotlin',
                                                    '- Kỹ năng sử dụng các công cụ phát triển và IDE như Android Studio, Eclipse và IntelliJ IDEA',
                                                    '- Hiểu biết về kiến trúc hệ thống Android, bao gồm cả phần mềm và phần cứng',
                                                    '- Kỹ năng phát triển giao diện người dùng cho các ứng dụng di động với các thành phần UI như RecyclerView, CardView, và ConstraintLayout',
                                                    '- Kỹ năng tương tác với các API và Cơ sở dữ liệu bao gồm các công nghệ như Room, SQLite và Firebase',
                                                    '- Kỹ năng phát triển ứng dụng đa nền tảng sử dụng các công nghệ như React Native hoặc Xamarin',
                                                    '- Hiểu biết về kiểm thử ứng dụng và sử dụng các công cụ như Espresso hoặc Robolectric',
                                                    '- Kỹ năng sử dụng công cụ quản lý mã nguồn như Git, SVN',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Lập trình viên iOS',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 22,
                                                requirements: [
                                                    '- Kiến thức chuyên sâu về lập trình Swift hoặc Objective-C',
                                                    '- Kỹ năng sử dụng các công cụ phát triển và IDE như Xcode, Interface Builder và Instruments',
                                                    '- Hiểu biết về kiến trúc hệ thống iOS',
                                                    '- Kỹ năng phát triển giao diện người dùng cho các ứng dụng di động với các thành phần UI như UITableView, UICollectionView, UIStackView',
                                                    '- Kỹ năng tương tác với các API và Cơ sở dữ liệu, bao gồm các công nghệ như Core Data và SQLite',
                                                    '- Kỹ năng tối ưu hóa hiệu suất của ứng dụng',
                                                    '- Hiểu biết về kiểm thử ứng dụng và sử dụng các công cụ như XCTest hoặc EarlGrey',
                                                    '- Khả năng sử dụng các công cụ và phần mềm quản lý mã nguồn như Git, SVN',
                                                ],
                                            },
                                        ],
                                    },
                                    {
                                        id: 3,
                                        choice_content: 'Game',
                                        agreements: 0,
                                        disagreemets: 0,
                                        questions: [
                                            {
                                                id: 1,
                                                content: 'Bạn có các kỹ năng về thiết kế hình ảnh không?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Có',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Không',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 2,
                                                content:
                                                    'Giữa công việc sáng tạo, thiết kế và lập trình, bạn lựa chọn cái nào?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Sáng tạo, thiết kế',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Lập trình ứng dụng',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                            {
                                                id: 3,
                                                content:
                                                    'Đối với quá trình phát triển của game, bạn muốn là người lên ý tưởng cho toàn bộ cốt truyện hay là người thực hiện các tính năng trong game?',
                                                choices: [
                                                    {
                                                        id: 1,
                                                        choice_data: 'Lên ý tưởng cho toàn bộ cốt truyện',
                                                        is_agreed: true,
                                                    },
                                                    {
                                                        id: 2,
                                                        choice_data: 'Thực hiện các tính năng trong game',
                                                        is_agreed: false,
                                                    },
                                                ],
                                            },
                                        ],
                                        job_recommendations: [
                                            {
                                                id: 1,
                                                name: 'Game Designer',
                                                min_agreements: 2,
                                                max_agreements: 3,
                                                salary: 20,
                                                requirements: [
                                                    '- Kiến thức về lập trình: Lập trình game yêu cầu kiến thức chuyên sâu về các ngôn ngữ lập trình như C++, C#, JavaScript, Python, và Lua. Lập trình viên cần phải nắm vững các kỹ thuật lập trình, cấu trúc dữ liệu và thuật toán.',
                                                    '- Kiến thức về đồ họa: Lập trình game yêu cầu kiến thức về đồ họa để tạo ra các hiệu ứng đẹp mắt. Lập trình viên cần phải biết sử dụng các công cụ đồ họa 2D và 3D như Unity, Unreal Engine, hoặc Blender.',
                                                    '- Kiến thức về âm thanh: Lập trình game yêu cầu kiến thức về âm thanh để tạo ra các hiệu ứng âm thanh phù hợp với game. Lập trình viên cần phải biết sử dụng các công cụ âm thanh như FMOD Studio, Wwise.',
                                                    '- Kiến thức về game design: Lập trình game yêu cầu có kiến thức về game design để tạo ra các cốt truyện, gameplay, các màn chơi, độ khó và tính tương tác cho người chơi.',
                                                    '- Kiến thức về phát triển phần mềm: Lập trình game cũng yêu cầu kiến thức về phát triển phần mềm, bao gồm quản lý dự án, phiên bản hóa, kiểm thử và triển khai sản phẩm. Lập trình viên cần phải biết sử dụng các công cụ như Git, JIRA, hoặc Trello để quản lý dự án và tương tác với các thành viên khác trong nhóm.',
                                                ],
                                            },
                                            {
                                                id: 2,
                                                name: 'Lập trình Game',
                                                min_agreements: 0,
                                                max_agreements: 1,
                                                salary: 30,
                                                requirements: [
                                                    '- Kiến thức về lập trình: Lập trình game yêu cầu kiến thức chuyên sâu về các ngôn ngữ lập trình như C++, C#, JavaScript, Python, và Lua. Lập trình viên cần phải nắm vững các kỹ thuật lập trình, cấu trúc dữ liệu và thuật toán.',
                                                    '- Kiến thức về đồ họa: Lập trình game yêu cầu kiến thức về đồ họa để tạo ra các hiệu ứng đẹp mắt. Lập trình viên cần phải biết sử dụng các công cụ đồ họa 2D và 3D như Unity, Unreal Engine, hoặc Blender.',
                                                    '- Kiến thức về âm thanh: Lập trình game yêu cầu kiến thức về âm thanh để tạo ra các hiệu ứng âm thanh phù hợp với game. Lập trình viên cần phải biết sử dụng các công cụ âm thanh như FMOD Studio, Wwise.',
                                                    '- Kiến thức về game design: Lập trình game yêu cầu có kiến thức về game design để tạo ra các cốt truyện, gameplay, các màn chơi, độ khó và tính tương tác cho người chơi.',
                                                    '- Kiến thức về phát triển phần mềm: Lập trình game cũng yêu cầu kiến thức về phát triển phần mềm, bao gồm quản lý dự án, phiên bản hóa, kiểm thử và triển khai sản phẩm. Lập trình viên cần phải biết sử dụng các công cụ như Git, JIRA, hoặc Trello để quản lý dự án và tương tác với các thành viên khác trong nhóm.',
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ],
                },
            },
            {
                id: 5,
                choice_content: 'Bảo mật',
                agreements: 0,
                disagreemets: 0,
                questions: [
                    {
                        id: 1,
                        content:
                            'Bạn muốn tập trung vào bảo vệ các hệ thống máy tính của tổ chức hay bảo vệ toàn bộ thông tin của tổ chức?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Bảo vệ các hệ thống máy tính',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Bảo vệ toàn bộ thông tin',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 2,
                        content:
                            'Bạn muốn làm việc với các kỹ sư, nhân viên công nghệ thông tin khác trong tổ chức hay làm việc với bộ phận nhân sự, tài chính, kinh doanh?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Kỹ sư, nhân viên công nghệ thông tin',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Bộ phận nhân sự, tài chính, kinh doanh',
                                is_agreed: false,
                            },
                        ],
                    },
                    {
                        id: 3,
                        content:
                            'Bạn có ưu thế về các kỹ năng mạng máy tính, hệ điều hành hay các kiến thức về chuẩn hóa mật mã, phân tích rủi ro của bảo mật?',
                        choices: [
                            {
                                id: 1,
                                choice_data: 'Mạng máy tính, hệ điều hành',
                                is_agreed: true,
                            },
                            {
                                id: 2,
                                choice_data: 'Chuẩn hóa mật mã, phân tích rủi ro bảo mật',
                                is_agreed: false,
                            },
                        ],
                    },
                ],
                job_recommendations: [
                    {
                        id: 1,
                        name: 'Chuyên viên bảo mật máy tính',
                        min_agreements: 2,
                        max_agreements: 3,
                        salary: 22,
                        requirements: [
                            '- Kiến thức về an toàn thông tin: các chuẩn mật mã, các giải pháp bảo mật, các phương pháp phát hiện và ngăn chặn các cuộc tấn công',
                            '- Kỹ năng phân tích và đánh giá rủi ro',
                            '- Kỹ năng thiết kế hệ thống bảo mật: đánh giá yêu cầu bảo mật, thiết kế các giải pháp bảo mật phù hợp với yêu cầu của công ty',
                            '- Kỹ năng triển khai giải pháp bảo mật',
                            '- Kỹ năng quản lý và vận hành hệ thống bảo mật',
                            '- Kỹ năng giải quyết sự cố',
                        ],
                    },
                    {
                        id: 2,
                        name: 'Chuyên viên an toàn thông tin',
                        min_agreements: 0,
                        max_agreements: 1,
                        salary: 16,
                        requirements: [
                            '- Kiến thức về an toàn thông tin: các chuẩn mật mã, các giải pháp bảo mật, các phương pháp phát hiện và ngăn chặn các cuộc tấn công',
                            '- Kỹ năng phân tích và đánh giá rủi ro',
                            '- Kỹ năng triển khai giải pháp bảo mật: cấu hình các thiết bị bảo mật, triển khai các phần mềm bảo mật',
                            '- Kỹ năng quản lý và vận hành hệ thống bảo mật',
                            '- Kỹ năng tư vấn và đào tạo',
                        ],
                    },
                ],
            },
            {
                id: 6,
                choice_content: 'Mạng',
                entry_question: {
                    content:
                        'Bạn lựa chọn công việc quản lý, điều hành hệ thống mạng hay thiết kế, triển khai, bảo trì hệ thống mạng?',
                    choices: [
                        {
                            id: 1,
                            choice_content: 'Quản lý, điều hành hệ thống mạng',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn yêu thích công việc làm trên hệ thống mạng hay các hệ thống truyền thông dữ liệu?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Hệ thống mạng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Hệ thống truyền thông dữ liệu',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn có kiến thức chuyên sâu về công nghệ mạng hay công nghệ truyền thông dữ liệu?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Công nghệ mạng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Công nghệ truyền thông dữ liệu',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Bạn muốn làm việc với các kỹ sư phần cứng, phần mềm, bảo mật hay với các nhóm kinh doanh, marketing?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Kỹ sư phần cứng, phần mềm, bảo mật',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Nhóm kinh doanh, marketing',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Kỹ sư triển khai mạng',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 9,
                                    requirements: [
                                        '- Kiến thức về mạng và giao thức mạng: mô hình OSI, TCP/IP, các giao thức mạng, các thiết bị mạng',
                                        '- Kỹ năng quản lý và vận hành hệ thống mạng',
                                        '- Kỹ năng bảo mật và bảo vệ hệ thống mạng',
                                        '- Kỹ năng phát triển ứng dụng mạng',
                                        '- Kỹ năng giải quyết sự cố',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Chuyên gia truyền thông dữ liệu',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 25,
                                    requirements: [
                                        '- Kiến thức về mạng và truyền thông: mô hình OSI, TCP/IP, …',
                                        '- Kỹ năng thiết kế và triển khai hệ thống truyền thông dữ liệu: lựa chọn các phương tiện truyền thông, cấu hình và cài đặt các thiết bị mạng, …',
                                        '- Kỹ năng quản lý và vận hành hệ thống truyền thông dữ liệu',
                                        '- Kỹ năng bảo mật và bảo vệ hệ thống truyền thông dữ liệu: giải pháp bảo mật mạng, điều chỉnh các chính sách bảo mật và phát hiện các mối đe dọa bảo mật, …',
                                        '- Kỹ năng phát triển ứng dụng và truyền thông dữ liệu',
                                        '- Kỹ năng giải quyết sự cố',
                                    ],
                                },
                            ],
                        },
                        {
                            id: 2,
                            choice_content: 'Thiết kế, triển khai, bảo trì hệ thống mạng',
                            agreements: 0,
                            disagreemets: 0,
                            questions: [
                                {
                                    id: 1,
                                    content:
                                        'Bạn muốn tập trung công việc vào quản lý, điều hành hạ tầng mạng hay bảo vệ hệ thống mạng khỏi các mối đe dọa bảo mật?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Quản lý, điều hành hạ tầng mạng',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Bảo vệ hệ thống mạng',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 2,
                                    content:
                                        'Bạn có kiến thức chuyên sâu về máy chủ, hệ thống lưu trữ hay kiến thức về các mối đe dọa bảo mật?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Máy chủ, hệ thống lưu trữ',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Các mối đe dọa bảo mật',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                                {
                                    id: 3,
                                    content:
                                        'Giữa lựa chọn làm việc với bộ phận kinh doanh, nhân sự, tài chính và làm việc với các chuyên gia phân tích, bạn ưu tiên lựa chọn nào?',
                                    choices: [
                                        {
                                            id: 1,
                                            choice_data: 'Bộ phận kinh doanh, nhân sự, tài chính',
                                            is_agreed: true,
                                        },
                                        {
                                            id: 2,
                                            choice_data: 'Chuyên gia phân tích',
                                            is_agreed: false,
                                        },
                                    ],
                                },
                            ],
                            job_recommendations: [
                                {
                                    id: 1,
                                    name: 'Chuyên viên quản trị hạ tầng mạng',
                                    min_agreements: 2,
                                    max_agreements: 3,
                                    salary: 19,
                                    requirements: [
                                        '- Kiến thức về hạ tầng mạng: dịch vụ mạng, cơ sở hạ tầng mạng, bao gồm giám sát hệ thống, phát hiện và giải quyết các vấn đề liên quan đến mạng',
                                        '- Kỹ năng bảo mật và bảo vệ hạ tầng mạng',
                                        '- Kỹ năng quản lý và triển khai hệ thống mạng',
                                        '- Kỹ năng giải quyết sự cố: phát hiện và khắc phục các lỗi liên quan đến mạng, đảm bảo rằng hệ thống mạng hoạt động ổn định và đáp ứng được nhu cầu người dùng',
                                    ],
                                },
                                {
                                    id: 2,
                                    name: 'Chuyên gia bảo mật mạng',
                                    min_agreements: 0,
                                    max_agreements: 1,
                                    salary: 20,
                                    requirements: [
                                        '- Kiến thức về mạng máy tính: mô hình OSI, giao thức TCP/IP, công nghệ mạng LAN, WLAN, WAN, VPN, router, switch, firewall, IDS, IPS, WAF, …',
                                        '- Kỹ năng phân tích mối đe dọa bảo mật mạng',
                                        '- Kỹ năng thiết kế và triển khai giải pháp bảo mật mạng',
                                        '- Kỹ năng giám sát và phát hiện xâm nhập mạng',
                                        '- Kỹ năng phòng ngừa và phục hồi sau sự cố bảo mật mạng',
                                        '- Kỹ năng kiểm tra và đánh giá bảo mật mạng',
                                        '- Kỹ năng quản lý chính sách bảo mật mạng',
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        ],
    },
    soft_skill: [
        '- Kỹ năng giải quyết vấn đề: Kỹ năng này là rất quan trọng trong lĩnh vực công nghệ phần mềm, vì bạn phải tìm ra giải pháp cho các vấn đề kỹ thuật phức tạp. Kỹ năng giải quyết vấn đề bao gồm khả năng phân tích, tìm kiếm và đưa ra giải pháp.',
        '- Kỹ năng lập trình: Với lĩnh vực công nghệ phần mềm, kỹ năng lập trình là một trong những kỹ năng cơ bản nhất. Bạn cần có kiến thức về cú pháp, cấu trúc dữ liệu, giải thuật và ngôn ngữ lập trình.',
        '- Kỹ năng quản lý dự án: Kỹ năng quản lý dự án giúp bạn xây dựng kế hoạch, phân tích rủi ro và quản lý thời gian. Điều này giúp bạn đảm bảo rằng các dự án của bạn được hoàn thành đúng hạn, đúng chất lượng và đúng ngân sách.',
        '- Kỹ năng giao tiếp: Kỹ năng giao tiếp là rất quan trọng trong lĩnh vực công nghệ phần mềm, vì bạn phải làm việc với đồng nghiệp, khách hàng và các bên liên quan khác. Kỹ năng giao tiếp bao gồm khả năng lắng nghe, truyền đạt thông tin và thuyết phục người khác.',
        '- Kỹ năng học tập liên tục: Lĩnh vực công nghệ phần mềm thường thay đổi nhanh chóng, vì vậy bạn cần phải cập nhật kiến thức liên tục. Kỹ năng học tập liên tục bao gồm khả năng tìm kiếm thông tin, đọc tài liệu, tham gia các khóa học và thực hành.',
        '- Kỹ năng tư duy logic: Kỹ năng tư duy logic giúp bạn phân tích và giải quyết các vấn đề kỹ thuật phức tạp. Điều này bao gồm khả năng suy luận, phân tích và đưa ra các giải pháp logic.',
        '- Kỹ năng đội nhóm: Kỹ năng đội nhóm giúp bạn làm việc hiệu quả với các đồng nghiệp khác. Điều này bao gồm khả năng hợp tác, chia sẻ kiến thức và giải quyết xung đột.',
    ],
    promotion: [
        '- Chuyên gia về một lĩnh vực cụ thể: Một chuyên gia về một lĩnh vực cụ thể như an ninh mạng, trí tuệ nhân tạo, đám mây, phát triển phần mềm, quản trị hệ thống, ... có thể trở thành lãnh đạo hoặc quản lý dự án trong lĩnh vực của mình.',
        '- Quản lý dự án: Với kinh nghiệm và kiến thức về quản lý dự án, bạn có thể trở thành một quản lý dự án trong lĩnh vực công nghệ thông tin. Quản lý dự án là một vị trí quan trọng, phụ trách xây dựng kế hoạch, điều phối các nhân viên và đảm bảo dự án được hoàn thành đúng hạn và đúng chất lượng.',
        '- Kiểm thử phần mềm: Kiểm thử phần mềm là một vị trí quan trọng trong lĩnh vực công nghệ thông tin. Nếu bạn có kinh nghiệm và kiến thức về kiểm thử phần mềm, bạn có thể trở thành một chuyên gia kiểm thử hoặc quản lý kiểm thử.',
        '- Giám đốc công nghệ thông tin: Nếu bạn có kinh nghiệm lâu dài và kiến thức sâu rộng về công nghệ thông tin, bạn có thể trở thành giám đốc công nghệ thông tin của một công ty. Vị trí này phụ trách toàn bộ hoạt động công nghệ thông tin của công ty và có trách nhiệm cao.',
        '- Khởi nghiệp: Nếu bạn có ý tưởng và kinh nghiệm trong lĩnh vực công nghệ thông tin, bạn có thể bắt đầu một công ty khởi nghiệp của riêng mình. Đây là một cơ hội để trở thành một doanh nhân thành công và kiếm được nhiều tiền.',
    ],
};
