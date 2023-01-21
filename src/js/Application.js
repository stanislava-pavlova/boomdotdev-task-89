import EventEmitter from 'eventemitter3';
import image from '../images/planet.svg';

export default class Application extends EventEmitter {
  static get events() {
    return {
      READY: 'ready',
    };
  }

  constructor() {
    super();
    this._loading = document.body.querySelector('progress');
    this._startLoading();
    this._create();
    this.emit(Application.events.READY);
  }

  async _load() {
    const apiUrl = 'https://swapi.boom.dev/api/planets/';
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  }

  _create() {
    const data = this._load();
    data.then((res) => {
      console.log(res);
      for (let i = 0; i < res.results.length; i++) {
        const box = document.createElement('div');
        box.classList.add('box');
        box.innerHTML = this._render({
          name: res.results[i].name,
          terrain: res.results[i].terrain,
          population: res.results[i].population,
        });
        document.body.querySelector('.main').appendChild(box);
        this._stopLoading();
      }
    });
  }

  _render({ name, terrain, population }) {
    return `
      <article class="media">
        <div class="media-left">
          <figure class="image is-64x64">
            <img src="${image}" alt="planet" />
          </figure>
        </div>
        <div class="media-content">
          <div class="content">
            <h4>${name}</h4>
            <p>
              <span class="tag">${terrain}</span>
              <span class="tag">${population}</span>
              <br />
            </p>
          </div>
        </div>
      </article>
    `;
  }

  _startLoading() {
    document.querySelector('progress').style.display = 'block';
  }

  _stopLoading() {
    document.querySelector('progress').style.display = 'none';
  }
}
