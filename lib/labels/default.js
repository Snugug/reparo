'use strict';

const colors = require('ibm-design-colors/ibm-colors.json');

module.exports = {
  'section': {
    'color': colors.blue['10'],
    'description': 'Section of the project that this issue belongs to.',
    'labels': [
      'section',
    ],
  },
  'problem': {
    'color': colors.red['40'],
    'description': 'Issues that make the product feel broken or prevent us from doing further work. High priority, especially if present in production.',
    'labels': [
      'blocked',
      'blocker',
      'bug',
      'externally blocked',
      'hotfix',
    ],
  },
  'experience': {
    'color': colors.orange['20'],
    'description': 'Issues that affect a user\'s comprehension or overall enjoyment of the product.',
    'labels': [
      'visual design',
      'copy',
      'user experience',
      'developer experience',
    ],
  },
  'environment': {
    'color': colors['warm-gray']['10'],
    'description': 'Environment that the issue is present in.',
    'labels': [
      'staging',
      'production',
    ],
  },
  'mindless': {
    'color': colors.orange['10'],
    'description': 'Issues that are necessary but less impactful for our users.',
    'labels': [
      'cleanup',
      'legal',
      'technical debt',
      'experience debt',
    ],
  },
  'feedback': {
    'color': colors.magenta['50'],
    'description': 'Issues that require further conversation to figure out how to proceed or what action steps are needed.',
    'labels': [
      'request for comments',
      'help wanted',
      'question',
      'research',
      'strategy',
      'ready for review',
      'stub',
      'prototype',
    ],
  },
  'addition': {
    'color': colors.green['20'],
    'description': 'Issues that will result in new functionality or releases.',
    'labels': [
      'feature',
      'release',
    ],
  },
  'improvement': {
    'color': colors.teal['30'],
    'description': 'Issues that will iterate on existing functionality.',
    'labels': [
      'enhancement',
      'optimization',
    ],
  },
  'pending': {
    'color': colors.yellow['20'],
    'description': 'Issues where action can be taken, but has not yet.',
    'labels': [
      'under consideration',
      'consumable',
    ],
  },
  'inactive': {
    'color': colors['cool-gray']['10'],
    'description': 'Issues where no actions are needed or possible. The issue is either fixed, addressed better by other issues',
    'labels': [
      'invalid',
      'won\'t fix',
      'duplicate',
      'on hold',
    ],
  },
  'epic': {
    'color': colors.purple['50'],
    'description': 'Epics track multiple stories together towards a desired outcome. Each epic should get a label unique to the core concept of the epic, usually 2-3 words. Epics should be labeled with their epic label and the `epic` label. Each story related to an epic should be labeled with that epic\'s label.',
    'labels': [
      'epic',
    ],
  },
};
