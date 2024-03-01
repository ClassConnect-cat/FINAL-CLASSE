<template>
    <div class="wrapper">
        <header class="header">
            <p class="current-date">February 2024</p>
            <div class="icons">
                <span class="material-symbols-outlined">chevron_left</span>
                <span class="material-symbols-outlined">chevron_right</span>
            </div>
        </header>
        <div class="calendar">
            <ul class="weeks">
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
                <li>Sun</li>
            </ul>
            <ul class="days"></ul>
        </div>
    </div>
</template>
<script setup>
    import { onMounted } from 'vue';

    onMounted(() => {
        const currentDate = document.querySelector('.current-date'),
        daysTag = document.querySelector('.days'),
        prevNextIcon = document.querySelectorAll('.icons span');

        console.log( currentDate, daysTag, prevNextIcon);

        let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const renderCalendar = () => {
            let firstDateOfMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),
            lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();

            let liTag = "";

            for (let i = firstDateOfMonth; i > 0; i--) {
                liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
            }

            for (let i = 1; i <= lastDateOfMonth; i++) {
                let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
                liTag += `<li class="${isToday}" >${i}</li>`;
            }

            for(let i = lastDayOfMonth; i < 6; i++) {
                liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
            }

            currentDate.innerHTML = `${months[currMonth]} ${currYear}`;
            daysTag.innerHTML = liTag;
        }
        renderCalendar();

        prevNextIcon.forEach(icon => {
            icon.addEventListener('click', () => {
                currMonth = icon.id === 'prev' ? currMonth - 1 : currMonth + 1;

                if (currMonth < 0 || currMonth > 11) {
                    date = new Date(currYear, currMonth);
                    currYear = date.getFullYear();
                    currMonth = date.getMonth();
                } else{
                    date = new Date();
                }
                renderCalendar();
            });
        });
    })
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}
.wrapper{
    width: 450px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 5px 4px 30px 0px rgba(0, 0, 0, 0.10);
}
.wrapper header{
    display: flex;
    align-items: center;
    padding: 25px 30px 10px;
    justify-content: space-between;
}
.header .current-date{
    font-size: 1.45rem;
    font-weight: 500;
}
.header .icons span{
    height: 38px;
    width: 38px;
    color: #878787;
    font-size: 1.9rem;
    margin: 0 1px;
    cursor: pointer;
    text-align: center;
    line-height: 38px;
    border-radius: 50%;
}
.header .icons span:hover{
    background: #f2f2f2;
}
.header .icons span:last-child{
    margin-right: -10px;
}
.calendar{
    padding: 20px;
}
.calendar ul{
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    text-align: center;
}
.calendar .days{
    margin-bottom: 20px;
}
.calendar .weeks li{
    font-weight: 500;
}
.calendar ul li{
    position: relative;
    width: calc(100% / 7);
}
.calendar .days li{
    z-index: 1;
    cursor: pointer;
    margin-top: 30px;
}
.calendar .days li.inactive{
    color: #aaa;
}
.calendar .days li.active{
    color: #fff;
}
.calendar .days li::before{
    position: absolute;
    content: "";
    height: 40px;
    width: 40px;
    top: 50%;
    left: 50%;
    z-index: -1;
    border-radius: 50%;
    transform: translate(-50%, -50%);
}
.calendar .days li:hover::before{
    background: #f2f2f2;
}
.calendar .days li.active::before{
    background: rgb(0, 179, 255);
}
</style>