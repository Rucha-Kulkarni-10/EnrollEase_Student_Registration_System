
// domcontent event listener added for applying event on specific html document
document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentTable = document.getElementById('studentTable').querySelector('tbody');
    let students = JSON.parse(localStorage.getItem('students')) || [];

    // this function created for updating the data in rows
    const renderTable = () => {
        studentTable.innerHTML = '';
        students.forEach((student, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
            // data-index attribute is used to associate with edit and delete button 
        });
    };

    // Converts the students array to a JSON string and stores it in localStorage
    const saveToLocalStorage = () => {
        localStorage.setItem('students', JSON.stringify(students));
    };

    // adding new row or updating the data of students after clicking on add button
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('stud_Name').value.trim();
        const id = document.getElementById('stud_ID').value.trim();
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value.trim();

        if (!name || !id || !contact) {
            alert('Please fill out all required fields.');
            return;
        }

        const newStudent = { name, id, email, contact };
        students.push(newStudent);
        saveToLocalStorage();
        renderTable();
        studentForm.reset();
    });

    studentTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            // Retrieves the index of the student record from the clicked button data-index attribute
            const index = e.target.getAttribute('data-index');
            const student = students[index];
            document.getElementById('stud_Name').value = student.name;
            document.getElementById('stud_ID').value = student.id;
            document.getElementById('email').value = student.email;
            document.getElementById('contact').value = student.contact;

            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        } else if (e.target.classList.contains('delete')) {
            // Retrieves the index of the student record from the clicked button data-index attribute
            const index = e.target.getAttribute('data-index');
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    });

    renderTable();
});

