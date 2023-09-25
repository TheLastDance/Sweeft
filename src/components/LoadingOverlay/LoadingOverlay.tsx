import './LoadingOverlay.css'
import ReactDOM from "react-dom";
import { ILoadingOverlayProps } from '../../types/types';

export const LoadingOverlay: React.FC<ILoadingOverlayProps> = ({ isVisible }) => {
  const loadingOverlayElement = document.getElementById("loading-overlay");
  if (!loadingOverlayElement) {
    return null;
  }
  return ReactDOM.createPortal(isVisible
    ? (
      <div data-test="loading-overlay" className="loader-overlay">
        <span className="loader" />
      </div>
    )
    : null, loadingOverlayElement);
};