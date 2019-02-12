import './SrcsetBackgroundImage.css';
import React from 'react';

type Props = {
  srcSet: string;
  sizes: string;
  src: string;
  alt?: string;
  onImageChange: (imageUrl: string) => void;
};

type State = {
  isComponentMounted: boolean;
};

class SrcsetBackgroundImage extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isComponentMounted: false
    };

    this.onImageLoad = this.onImageLoad.bind(this);
  }

  componentDidMount() {
    // This is needed because we can't render the image until client side
    // If image is included during server side render the img.onLoad will not trigger
    this.setState({
      isComponentMounted: true
    });
  }

  onImageLoad(event) {
    event.nativeEvent.stopImmediatePropagation();
    const imgUrl = event.currentTarget.currentSrc || event.currentTarget.src;

    this.props.onImageChange(imgUrl);
  }

  render() {
    return this.state.isComponentMounted ? (
      <img
        styleName="image"
        srcSet={this.props.srcSet}
        sizes={this.props.sizes}
        src={this.props.src}
        onLoad={this.onImageLoad}
        alt={this.props.alt}
      />
    ) : null;
  }
}

export default SrcsetBackgroundImage;
