export default class Vessel {
  private controller!: string;

  private controllerActive!: boolean;

  constructor(id: string) {
    this.controller = id;
    this.controllerActive = false;
  }
}
