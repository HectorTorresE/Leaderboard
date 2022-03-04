import ApiData from './apiData.js';

class leaderboard {
  scoreList = [];

  constructor() {
    this.data = new ApiData();
  }

  async add(user, score) {
    const result = await this.data.addData(user, score);
    if (result) {
      this.scoreList.push({ user, score: Number(score) });
      this.RefreshList();
    }
  }

  RefreshList() {
    const list = document.getElementById('leaderboard');
    list.innerHTML = '';
    let listHtml = '';
    if (this.scoreList.length > 0) {
      this.scoreList.sort((first, second) => {
        if (first.score < second.score) return 1;
        if (first.score > second.score) return -1;
        return 0;
      });
    }
    this.scoreList.forEach((e, i) => {
      if (i === 0) {
        listHtml += `
        <div class="row borderT">
          <div class="col-6 text-start">
            <h5 class="m-2">${e.user}: ${e.score}</h5>
          </div>
          <div class="col-6 text-end">
          </div>
        </div>
        `;
        return;
      }
      if (i === this.scoreList.length - 1 && i % 2 !== 0) {
        listHtml += `
        <div class="row borderBW">
        <div class="col-6 text-start">
          <h5 class="m-2">${e.user}: ${e.score}</h5>
        </div>
        <div class="col-6 text-end">
        </div>
      </div>
        `;
        return;
      }
      if (i === this.scoreList.length - 1 && i % 2 === 0) {
        listHtml += `
        <div class="row borderB">
          <div class="col-6 text-start">
            <h5 class="m-2">${e.user}: ${e.score}</h5>
          </div>
          <div class="col-6 text-end">
          </div>
        </div>
        `;
        return;
      }
      if (i % 2 !== 0) {
        listHtml += `
        <div class="row borderMW">
          <div class="col-6 text-start">
            <h5 class="m-2">${e.user}: ${e.score}</h5>
          </div>
          <div class="col-6 text-end">
          </div>
        </div>
        `;
      } else {
        listHtml += `
        <div class="row borderM">
          <div class="col-6 text-start">
            <h5 class="m-2">${e.user}: ${e.score}</h5>
          </div>
          <div class="col-6 text-end">
          </div>
        </div>
        `;
      }
    });
    list.innerHTML = listHtml;
  }

  submitEvent() {
    const user = document.getElementById('user');
    const score = document.getElementById('score');
    if (user.value.length === 0) {
      user.value = '';
      score.value = '';
      return;
    }
    if (score.value < 0) {
      user.value = '';
      score.value = '';
      return;
    }
    this.add(user.value, score.value);
    this.RefreshList();
    user.value = '';
    score.value = '';
    user.focus();
  }

  async getData() {
    this.scoreList = await this.data.getData();
  }

  async update() {
    this.getData().then(() => {
      this.RefreshList();
    });
  }

  EventList() {
    document.getElementById('submit').addEventListener('click', () => {
      this.submitEvent();
    });
    document.getElementById('score').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.submitEvent();
    });

    document.getElementById('refresh').addEventListener('click', () => {
      this.update();
    });
  }
}

export default leaderboard;