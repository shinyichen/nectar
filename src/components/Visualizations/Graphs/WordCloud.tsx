import { ReactElement, useCallback } from 'react';
import { useD3 } from './useD3';
import d3Cloud from 'd3-cloud';
import { Selection } from 'd3';
import { noop } from '@utils';

const width = 1000;

const height = 600;

export interface WordDatum extends d3Cloud.Word {
  text: string;
  size: number;
  origSize: number;
}

// random position for words coming from all directions along the 4 boundaries
const randomStartPos = () => {
  const r = Math.floor(Math.random() * 4);

  switch (r) {
    case 0:
      return `translate(${0}, ${Math.random() * height})`;
    case 1:
      return `translate(${Math.random() * width}, ${height})`;
    case 2:
      return `translate(${Math.random() * width}, ${0})`;
    default:
      return `translate(${width}, ${Math.random() * height})`;
  }
};
export interface IWordCloudProps {
  wordData: WordDatum[];
  fill: d3.ScaleLogarithmic<string, string, never>;
  onSelect?: (word: string) => void;
}

export const WordCloud = ({ wordData, fill, onSelect = noop }: IWordCloudProps): ReactElement => {
  const renderFunction = useCallback(
    (svg: Selection<SVGSVGElement, unknown, HTMLElement, unknown>) => {
      svg.selectAll('*').remove();

      svg
        .attr('viewBox', [0, 0, width, height])
        .attr('width', width)
        .attr('font-family', 'sans-serif')
        .attr('text-anchor', 'middle')
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
        .classed('concept-cloud-svg', true);

      const g = svg.append('g').attr('transform', `translate(${0},${0})`).classed('word-cloud-container', true);

      const cloud = d3Cloud<WordDatum>()
        .size([width, height])
        .words(wordData)
        .spiral('archimedean')
        .padding(0)
        .rotate(0)
        .font('sans-serif')
        .fontSize((d) => d.size)
        .on('word', ({ size, x, y, rotate, text, origSize }) => {
          g.append('text')
            .attr('font-size', size)
            .text(text)
            .classed('word', true)
            .style('fill', fill(origSize))
            .on('click', () => onSelect(text))
            .attr('transform', randomStartPos())
            .transition()
            .duration(1000)
            .attr('transform', `translate(${x},${y}) rotate(${rotate})`);
        });

      cloud.start();

      return svg;
    },
    [wordData],
  );

  const { ref } = useD3(renderFunction, [renderFunction]);

  return <svg ref={ref} />;
};
