// @flow
import type { ModuleSelectList } from 'types/reducers';

import React, { Component } from 'react';
import _ from 'lodash';
import VirtualizedSelect from 'react-virtualized-select';
import createFilterOptions from 'react-select-fast-filter-options';
import { PrefixIndexStrategy } from 'js-search';
import { ModulesSearchIndex, ModulesTokenizer } from 'utils/modules-search';

type Props = {
  moduleList: ModuleSelectList,
  onChange: Function,
  placeholder: string,
};

class ModulesSelect extends Component {
  shouldComponentUpdate(nextProps: Props) {
    return _.size(this.props.moduleList) !== _.size(nextProps.moduleList);
  }

  props: Props;

  render() {
    const filterOptions = createFilterOptions({
      options: this.props.moduleList,
      indexStrategy: new PrefixIndexStrategy(),
      tokenizer: new ModulesTokenizer(),
      searchIndex: new ModulesSearchIndex(),
    });

    return (
      <VirtualizedSelect options={this.props.moduleList}
        filterOptions={filterOptions}
        placeholder={this.props.placeholder || 'Search module'}
        onChange={this.props.onChange}
      />
    );
  }
}

export default ModulesSelect;
