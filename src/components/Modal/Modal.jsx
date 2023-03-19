import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.props.onClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.props.onClick);
  }

  render() {
    const {
      openedImage: { src, tags },
      onClick,
    } = this.props;
    return (
      <div className={css.Overlay} onClick={onClick}>
        <div className={css.Modal}>
          <img src={src} alt={tags} />
        </div>
      </div>
    );
  }
}
