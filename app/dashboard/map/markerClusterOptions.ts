
export class MarkerClusterOptions {
  static path: String = "node_modules/markerclustererplus/images/m";
  static extension: String = ".png";
  static get() {
    return {styles: [{
        height: 53,
        url: this.path + "1" + this.extension,
        width: 53
      },
      {
        height: 56,
        url: this.path + "2" + this.extension,
        width: 56
      },
      {
        height: 66,
        url: this.path + "3" + this.extension,
        width: 66
      },
      {
        height: 78,
        url: this.path + "4" + this.extension,
        width: 78
      },
      {
        height: 90,
        url: this.path + "5" + this.extension,
        width: 90
    }]};
  }
}
