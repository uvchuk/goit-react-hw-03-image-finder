import { Loading } from 'notiflix';
import { Component } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import css from './Loader.module.css';

export class Loader extends Component {
  componentWillUnmount() {
    Loading.remove();
  }
  render() {
    return Loading.circle();
    // <div className={css.loader}>
    //       <RotatingLines
    //         strokeColor="grey"
    //         strokeWidth="5"
    //         animationDuration="0.75"
    //         width="96"
    //         visible={true}
    //       />
    //     </div>
  }
}
