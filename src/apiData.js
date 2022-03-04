class ApiData {
  baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';

  Key = 'XYGdTBhAmzYfPxJDflJw';

  async getData() {
    const request = new XMLHttpRequest();
    request.open('GET', `${this.baseURL}${this.Key}/scores`, false);
    request.setRequestHeader('Credentials', 'omit');
    request.setRequestHeader('Acept', 'application/json');
    request.setRequestHeader('Content-Type', 'text/plain');
    request.send();
    if (request.status === 200) return JSON.parse(request.response).result;
    return [];
  }

  async addData(user, score) {
    const request = new XMLHttpRequest();
    request.open('POST', `${this.baseURL}${this.Key}/scores`, false);
    request.setRequestHeader('Credentials', 'omit');
    request.setRequestHeader('Acept', 'application/json');
    request.setRequestHeader('Content-Type', 'application/json');
    const body = `{"user":"${user}", "score":${Number(score)}}`;
    request.send(body);
    if (request.status === 201) {
      const response = JSON.parse(request.response).result;
      if (response === 'Leaderboard score created correctly.') return true;
      return false;
    }
    return false;
  }
}
export default ApiData;