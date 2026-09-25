// Academic year > semester > course category.
// Each course keeps its credit and grade beside its name so details can be added later.
const course = (name, credits, grade, note = '') => ({ name, credits, grade, note });

const semesterCourses = {
    '1-1': {
        '교양필수': [
            course('디지털미래세계와소통', 2, 'A0'),
            course('인류문명과기독교', 2, 'A-'),
            course('컴퓨팅적사고와코딩기초', 2, 'A+')
        ],
        '교양선택': [
            course('섬김의리더십', 1, 'P'),
            course('인문학글쓰기', 3, 'A0'),
            course('생활안전및대처방법', 3, 'P')
        ],
        '일반선택': [
            course('문학의세계', 3, 'B0'),
            course('영문법', 3, 'C+')
        ],
        '채플': [course('소그룹채플', 0.5, 'P')]
    },
    '1-2': {
        '교양필수': [
            course('미디어사회와비평적글쓰기', 2, 'B0'),
            course('AI와데이터기초', 3, 'A+'),
            course('한반도평화와통일', 1, 'P')
        ],
        '교양선택': [
            course('대학생활과진로탐색', 2, 'P'),
            course('자기주도적학습', 1, 'P')
        ],
        '일반선택': [
            course('영문정독연습', 3, 'C+'),
            course('영어의이해', 3, 'C+'),
            course('영국문학의이해', 3, 'C0')
        ],
        '채플': [course('CHAPEL', 0.5, 'P')]
    },
    '2-1': {
        '교양필수': [course('글로벌도시이해', 2, 'A-')],
        '전공필수': [
            course('관리경제', 3, 'B+'),
            course('마케팅', 3, 'B+'),
            course('경영수리와통계', 3, 'A-'),
            course('회계원리', 3, 'B-'),
            course('오퍼레이션매니지먼트', 3, 'A-')
        ],
        '채플': [course('CHAPEL', 0.5, 'P')]
    },
    '2-2': {
        '교양필수': [course('CTE for Liberal Arts & Humanities', 3, 'A+')],
        '전공필수': [
            course('경영정보시스템', 3, 'B+'),
            course('조직행동론', 3, 'B0'),
            course('경영학의이해', 3, 'A+')
        ],
        '전공선택': [course('재무회계', 3, 'A0')],
        '채플': [course('비전채플', 0.5, 'P')]
    },
    '3-1': {
        '교양필수': [course('혁신과기업가정신', 2, 'A+')],
        '교양선택': [
            course('취업에필요한재무제표이해', 3, 'P'),
            course('스프레드시트고급활용', 1, 'P')
        ],
        '전공기초': [course('비즈니스커뮤니케이션', 3, 'C+')],
        '전공선택': [
            course('인적자원관리', 3, 'A-'),
            course('글로벌전략경영', 3, 'A0'),
            course('거시조직론', 3, 'A-')
        ],
        '채플': [course('비전채플', 0.5, 'P')]
    },
    '3-2': {
        '교양선택': [course('컴퓨터그래픽', 2, 'P')],
        '전공필수': [course('재무관리', 3, 'B+', '재수강')],
        '전공선택': [
            course('신상품계획론', 3, 'B0'),
            course('서비스운영관리', 3, 'B+'),
            course('기획및조정관리', 3, 'B+'),
            course('리더십개발론', 3, 'C+')
        ],
        '채플': [course('비전채플', 0.5, 'P')]
    },
    '3-winter': {
        '일반선택': [
            course('국내단기현장실습A', 3, 'P'),
            course('국내단기현장실습B', 3, 'P')
        ]
    },
    '4-1': {
        '교양선택': [
            course('감성지능리더십', 3, 'A0'),
            course('P5.js_비주얼포트폴리오', 3, 'A0')
        ],
        '전공선택': [
            course('조직개발론', 3, 'A0'),
            course('창의적문제해결과비즈니스모델링', 3, 'B+'),
            course('경영정보시스템전략', 3, 'B+')
        ]
    },
    '4-summer': {
        '교양선택': [
            course('창의융합인재되기3code전략', 3, 'A0'),
            course('행복한가족을만드는관계기술', 3, 'A-')
        ]
    },
    '4-2': {
        '수강 중': [
            course('노사관계론', 3, null),
            course('경영정보시스템특강', 3, null)
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.getElementById('semester-buttons');
    const panel = document.getElementById('semester-panel');
    if (!buttons || !panel) return;

    const showSemester = (year, semester) => {
        const key = `${year}-${semester}`;
        const termLabel = typeof semester === 'number' ? `${semester}학기` : semester === 'winter' ? '겨울학기' : '여름학기';
        const groups = semesterCourses[key] || {};
        const count = Object.values(groups).reduce((total, courses) => total + courses.length, 0);
        buttons.querySelectorAll('button').forEach(button => {
            const selected = button.dataset.semester === key;
            button.classList.toggle('active', selected);
            button.setAttribute('aria-pressed', String(selected));
        });

        panel.replaceChildren();
        const title = document.createElement('h3');
        title.textContent = `${2022 + year}년 · ${year}학년 ${termLabel}`;
        panel.append(title);

        const meta = document.createElement('p');
        meta.className = 'semester-meta';
        meta.textContent = `${count}과목${year === 4 && semester === 2 ? ' · 현재 수강 중' : ''}`;
        panel.append(meta);

        for (const [category, courses] of Object.entries(groups)) {
            if (!courses.length) continue;
            const group = document.createElement('div');
            group.className = 'course-category';
            const heading = document.createElement('h4');
            heading.textContent = category;
            group.append(heading);

            const list = document.createElement('ul');
            list.className = 'course-list';
            for (const entry of courses) {
                const item = document.createElement('li');
                item.dataset.term = key;
                item.dataset.courseName = entry.name;
                const name = document.createElement('span');
                name.className = 'course-name';
                name.textContent = entry.name;
                const facts = document.createElement('span');
                facts.className = 'course-facts';
                const credit = document.createElement('span');
                credit.textContent = `${entry.credits}학점`;
                const grade = document.createElement('span');
                grade.textContent = entry.grade === null ? '성적 미확정' : `성적 ${entry.grade}`;
                facts.append(credit, grade);
                if (entry.note) {
                    const note = document.createElement('span');
                    note.textContent = entry.note;
                    facts.append(note);
                }
                item.append(name, facts);
                list.append(item);
            }
            group.append(list);
            panel.append(group);
        }
    };

    for (let year = 1; year <= 4; year++) {
        const group = document.createElement('div');
        group.className = 'academic-year';
        const heading = document.createElement('h3');
        heading.textContent = `${2022 + year}년 · ${year}학년`;
        group.append(heading);
        const semesterRow = document.createElement('div');
        semesterRow.className = 'semester-row';
        const terms = year === 3 ? [1, 2, 'winter'] : year === 4 ? [1, 'summer', 2] : [1, 2];
        for (const semester of terms) {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'semester-button';
            button.dataset.semester = `${year}-${semester}`;
            button.textContent = typeof semester === 'number' ? `${semester}학기` : semester === 'winter' ? '겨울학기' : '여름학기';
            button.addEventListener('click', () => showSemester(year, semester));
            semesterRow.append(button);
        }
        group.append(semesterRow);
        buttons.append(group);
    }

    showSemester(1, 1);
});
