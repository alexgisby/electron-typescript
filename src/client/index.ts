import BackgroundTasks from './background';

const background = new BackgroundTasks();

window.onload = () => {
    const messageList = document.getElementById('worker-messages');

    background.start();
    background.onMessage((event) => {
        const newNode = document.createElement('li');
        newNode.innerHTML = event.data;
        messageList.appendChild(newNode);
    });
};
