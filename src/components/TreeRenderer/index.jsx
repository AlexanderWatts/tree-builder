import React from 'react';
import PropTypes from 'prop-types';
import { TreeGraph } from '@antv/g6';

const container = document.getElementById('rendered');

const graph = new TreeGraph({
  container,
  fitView: true,
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  defaultEdge: {
    size: 3,
  },
  defaultNode: {
    size: 25,
    style: {
      lineWidth: 3,
    },
  },
  modes: {
    default: [
      'drag-canvas',
      'zoom-canvas',
    ],
  },
  layout: {
    type: 'dendrogram',
    direction: 'TB',
    nodeSep: 100,
    rankSep: 100,
  },
});

const TreeRenderer = ({ unsortedTree, sortedTree, sorted }) => {
  const render = (data) => {
    graph.data(data);
    graph.render();
  };

  if (sorted) {
    graph.cfg.defaultNode.color = 'green';
  } else {
    graph.cfg.defaultNode.color = 'blue';
  }

  return (
    <span>{sorted ? render(sortedTree) : render(unsortedTree)}</span>
  );
};

TreeRenderer.propTypes = {
  unsortedTree: PropTypes.objectOf(PropTypes.any).isRequired,
  sortedTree: PropTypes.objectOf(PropTypes.any).isRequired,
  sorted: PropTypes.bool.isRequired,
};

export default TreeRenderer;
