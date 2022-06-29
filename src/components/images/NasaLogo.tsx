import { forwardRef, Ref, SVGProps } from 'react';

const logo = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg width="1em" height="1em" viewBox="0 0 150 124" xmlns="http://www.w3.org/2000/svg" ref={ref} {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        d="M131.386 62c0 33.952-27.92 61.895-61.846 61.895C35.615 123.895 7.694 95.95 7.694 62 7.694 28.046 34.962.105 69.54.105c33.271 0 61.846 27.943 61.846 61.895"
        fill="#1A5DAD"
      />
      <path
        d="M83.491 94.576c26.423 10.89 21.837-16.628 7.753-37.697-7.982-11.937-18.393-21.882-24.96-26.681-21.772-15.92-35.213-6.264-19.839 25.13 4.971 10.151 11.356 17.002 16.343 23.46 3.808 4.93 11.225 7.398 8.613 9.738-2.945 2.638-10.075-8.997-10.075-8.997-5.266-6.363-10.285-13.152-15.458-22.467-11.819-21.28-10.115-42.997 11.278-33.537C75.3 31.557 92.64 54.087 99.613 70.085c3.22 7.388 12 36.619-15.963 24.8"
        fill="#FFF"
      />
      <path
        d="M1.325 80.348c11.624-7.755 22.645-12.763 41.4-18.968 26.354-8.722 46.19-14.585 70.526-26.84 10.893-5.484 29.795-17.784 36.555-28.477-2.024 4.139-8.291 12.193-11.129 15.756C105.657 63.24 35.32 60.891 1.79 80.777"
        fill="#EE293D"
      />
      <path
        d="M18.188 50.074c10.638.084 9.595-.02 9.719.104.186 0 8.494 14.335 8.494 14.458 0 .061-.062-5.094-.062-11.541 0-.745-2.045-2.917-1.984-2.917 3.037 0 7.005.062 7.005.062-1.487 1.738-1.784 1.595-1.796 2.669a761.98 761.98 0 000 17.002c.012 1.074.806 1.489 2.108 3.35h-9.735a1721.051 1721.051 0 01-8.928-15.14c.045.045-.125 6.206.06 11.169.063 1.64.807 2.172 2.172 3.662 0 0 1.57-.043-7.627.061 2.79-1.49 2.42-3.35 2.418-3.412-.1-6.858-.02-12.721-.02-16.507 0-.62-.043-.559-1.964-2.916M51.451 60.665c.893-3.106 1.656-5.883 2.019-7.693.06-.31-.682-1.427-1.86-2.544l-.084-.174c5.68.019 11.615.05 11.615.05 1.55 3.785 5.084 14.395 7.75 20.91.705 1.723 1.922 2.048 1.922 2.048-4.836-.062-13.81-.02-13.763-.062 2.418-2.173 2.107-2.173 1.053-5.336H52.54c-1.55 3.598.483 5.287.743 5.274-1.721.089-7.563 0-7.563 0 3.162-2.235 2.975-2.916 2.975-2.916.87-3.096 1.876-6.488 2.757-9.558h3.103l-1.334 4.282h6.016l-3.349-8.563-1.333 4.281h-3.103M103.41 60.975c.892-3.105 1.656-5.883 2.018-7.694.061-.309-.683-1.425-1.86-2.543l-.084-.173c5.682.018 11.618.05 11.618.05 1.547 3.784 5.082 14.395 7.748 20.91.704 1.723 1.921 2.048 1.921 2.048-4.834-.063-13.809-.02-13.763-.063 2.42-2.17 2.11-2.17 1.055-5.336h-7.565c-1.55 3.6.482 5.288.743 5.276-1.72.088-7.563 0-7.563 0 3.161-2.235 2.976-2.917 2.976-2.917.869-3.097 1.875-6.487 2.757-9.557h3.102c-.668 2.141-1.332 4.282-1.332 4.282h6.013l-3.349-8.563s-.664 2.14-1.332 4.28h-3.102M93.63 55.89c-.125-4.408 0-5.834 0-5.834-1.924 1.552-.954 1.354-5.766.558-13.87-2.292-14.927 10.68-7.379 13.59 6.336 2.443 8.58 2.921 7.625 5.21-.31.747-6.075 3.477-12.026-2.046l.122 7.695c.744-.768 2.792-2.172 2.792-2.172.06 0 6.45 2.82 12.213-.125 8.867-4.529 4.441-11.86-5.022-14.768-7.874-2.42-.434-8.067 7.377-2.047M70.41 5.726a.506.506 0 01-.503.505.507.507 0 01-.503-.505c0-.275.228-.504.503-.504.277 0 .504.229.504.504M73.904 13.367c0 .34-.282.62-.62.62-.34 0-.62-.28-.62-.62 0-.34.28-.62.62-.62.338 0 .62.28.62.62M82.967 25.854c0 .34-.28.62-.62.62a.624.624 0 01-.62-.62c0-.34.26-.621.6-.621.341 0 .64.28.64.621M68.397 17.672a.505.505 0 01-1.008 0c0-.277.228-.505.504-.505.277 0 .504.228.504.505M73.825 20.542a.507.507 0 01-.503.504.507.507 0 01-.504-.504c0-.276.228-.504.504-.504s.503.228.503.504M66.771 12.513c0 .34-.28.62-.62.62-.34 0-.62-.28-.62-.62 0-.34.28-.621.62-.621.34 0 .62.28.62.621M58.558 17.517a.507.507 0 01-.505.504.506.506 0 01-.503-.504c0-.277.227-.505.503-.505.277 0 .505.228.505.505M60.026 18.524a.507.507 0 01-.504.505.507.507 0 01-.505-.505.506.506 0 011.009 0M61.5 19.533a.507.507 0 01-.504.505.507.507 0 01-.504-.505c0-.276.228-.503.504-.503.277 0 .504.227.504.503M59.255 21.472a.508.508 0 01-.504.505.507.507 0 01-.505-.505c0-.276.228-.503.505-.503.275 0 .504.227.504.503M47.551 29.694a.506.506 0 01-.504.504.506.506 0 01-.505-.504c0-.277.228-.505.505-.505.276 0 .504.228.504.505M49.72 32.332a.507.507 0 01-.504.504.507.507 0 01-.504-.504c0-.278.228-.505.504-.505s.504.227.504.505M47.996 74.915a.506.506 0 01-.504.504.506.506 0 01-.504-.504c0-.276.228-.505.504-.505s.504.229.504.505M48.306 86.663c0 .34-.28.62-.62.62-.34 0-.62-.28-.62-.62 0-.34.28-.62.62-.62.34 0 .62.28.62.62M41.64 92.68a.507.507 0 01-.504.503.507.507 0 01-.504-.504c0-.277.228-.504.504-.504s.503.227.503.504M33.658 95.117c0 .34-.282.62-.621.62-.34 0-.62-.28-.62-.62 0-.34.28-.62.62-.62.339 0 .62.28.62.62M32.03 89.69c0 .339-.28.62-.62.62-.34 0-.62-.281-.62-.62 0-.341.28-.621.62-.621.34 0 .62.28.62.62M31.1 93.142a.506.506 0 01-.504.504.507.507 0 01-.504-.504c0-.276.228-.505.504-.505.277 0 .505.229.505.505M25.132 90.273a.507.507 0 01-.503.505.507.507 0 01-.505-.505c0-.276.228-.504.505-.504.276 0 .503.228.503.504M45.98 99.967a.49.49 0 01-.484.505c-.276 0-.524-.228-.524-.505 0-.276.228-.504.504-.504.277 0 .504.228.504.504M52.259 95.354c0 .341-.26.621-.601.621-.34 0-.64-.28-.64-.621 0-.34.28-.62.62-.62.341 0 .62.28.62.62M52.977 101.286c0 .277-.248.505-.523.505a.507.507 0 01-.504-.505c0-.276.227-.503.504-.503.275 0 .523.227.523.503M78.781 95.622a.507.507 0 01-.502.505.507.507 0 01-.506-.505.506.506 0 011.008 0M66.771 99.888a.505.505 0 01-.504.504.506.506 0 01-.503-.504c0-.276.228-.504.503-.504.277 0 .504.228.504.504M99.09 106.02a.507.507 0 01-.504.504.507.507 0 01-.506-.504c0-.277.228-.505.506-.505.275 0 .503.228.503.505M101.722 82.166c0 .34-.28.62-.62.62-.34 0-.62-.28-.62-.62 0-.34.28-.621.62-.621.34 0 .62.28.62.62M96.766 85.539a.507.507 0 01-.505.505.507.507 0 01-.503-.505c0-.277.227-.504.503-.504.277 0 .505.227.505.504M101.649 86.511c0 .34-.28.621-.62.621-.341 0-.62-.28-.62-.621 0-.34.279-.62.62-.62.34 0 .62.28.62.62M96.766 92.522a.507.507 0 01-.505.504.506.506 0 01-.503-.504c0-.277.227-.505.503-.505.277 0 .505.228.505.505M109.395 78.793a.507.507 0 01-.504.504.506.506 0 01-.503-.504c0-.277.228-.504.503-.504.276 0 .504.227.504.504M110.617 81.856a.605.605 0 01-.6.62c-.34 0-.638-.28-.638-.62 0-.34.28-.62.618-.62.34 0 .62.28.62.62M119.318 85.502c0 .34-.278.62-.62.62-.34 0-.62-.28-.62-.62 0-.34.28-.62.62-.62.342 0 .62.28.62.62M110.48 91.98c0 .277-.229.505-.505.505a.507.507 0 01-.503-.504c0-.278.228-.505.503-.505.276 0 .506.227.506.505M116.061 86.705a.506.506 0 01-.503.504.506.506 0 01-.503-.504c0-.276.228-.504.503-.504.276 0 .503.228.503.504M115.033 94.85a.506.506 0 01-.503.503.506.506 0 01-.505-.504c0-.276.228-.504.505-.504.276 0 .503.228.503.504M117.399 81.315a.78.78 0 01-.776.775.779.779 0 01-.775-.775c0-.426.35-.776.775-.776a.78.78 0 01.776.776"
        fill="#FFF"
      />
      <path
        fill="#FFF"
        d="M116.622 78.95l-.23 2.133-2.113.233 2.129.232.233 2.21.234-2.21 2.092-.271-2.111-.194-.234-2.133M111.97 94.807c0 .426-.35.776-.774.776a.78.78 0 01-.776-.776.78.78 0 01.776-.775c.425 0 .774.35.774.775"
      />
      <path
        fill="#FFF"
        d="M111.2 92.443l-.234 2.133-2.111.233 2.13.233.233 2.21.234-2.21 2.091-.272-2.112-.194-.232-2.133M54.157 30.74c0 .426-.35.775-.774.775a.778.778 0 01-.776-.775c0-.426.35-.775.776-.775.425 0 .774.35.774.775"
      />
      <path
        fill="#FFF"
        d="M53.381 28.374l-.233 2.133-2.112.233 2.132.232.232 2.211.232-2.211 2.093-.27-2.113-.195-.23-2.133M82.988 11.97a.78.78 0 01-.776.777.778.778 0 01-.773-.776c0-.426.349-.776.773-.776a.78.78 0 01.776.776"
      />
      <path
        fill="#FFF"
        d="M82.212 9.603l-.232 2.133-2.112.234 2.132.233.23 2.21.234-2.21 2.092-.273-2.112-.194-.232-2.133M47.937 107.223c0 .426-.35.775-.775.775a.779.779 0 01-.776-.775.78.78 0 01.776-.776.78.78 0 01.775.776"
      />
      <path
        fill="#FFF"
        d="M47.18 104.854l-.231 2.133-2.112.233 2.131.232.233 2.211.232-2.21 2.092-.271-2.111-.195-.233-2.133"
      />
      <path
        d="M149.8 6.064c-9.424 28.011-47.181 49.641-78.964 70.291-19.175 12.46-38.212 26.802-51.317 39.007-3.455 3.219.704-1.203-.62.156 18.29-21.098 39.328-33.664 50.954-41.573C89.515 60.563 100.7 57.19 134.621 25.888M9.186 75.461C5.801 77.121 2.77 78.76.196 80.36l1.566.571a68.659 68.659 0 017.796-4.112"
        fill="#EE293D"
      />
      <path
        d="M27.056 106.808a338.781 338.781 0 00-9.5 8.62l-.141 2.139c2.937-3.03 6.545-6.304 10.708-9.777"
        fill="#EE293D"
      />
      <path
        d="M83.491 94.576c26.423 10.89 21.837-16.628 7.753-37.697-7.982-11.937-17.827-21.406-24.96-26.681-8.328-6.16-9.141-6.672-9.141-6.672C75.742 32.37 92.638 54.088 99.61 70.087c3.22 7.387 12 36.618-15.963 24.8"
        fill="#FFF"
      />
    </g>
  </svg>
);

export const NasaLogo = forwardRef(logo);
