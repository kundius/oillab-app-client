import React, { useState } from 'react'
import {
  Classes,
  Placement,
  PlacementOptions,
  Popover2,
  Popover2InteractionKind,
  Popover2SharedProps,
  StrictModifierNames,
} from '@blueprintjs/popover2'
import {
  ButtonGroup,
  Button,
  AnchorButton,
  Divider,
  Intent,
  NonIdealState,
  Spinner,
  Popover,
  Icon,
  FormGroup,
  InputGroup,
  Tooltip,
  NumericInput
} from '@blueprintjs/core'

export function FilterPopover({ value, onChange }) {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <div className="flex items-center">
      <div className="mr-1">{value?.brand?.contains || '-'} / {value?.model?.contains || '-'} / {value?.viscosity?.contains || '-'}</div>
      <Popover2
        isOpen={isOpened}
        placement="bottom"
        interactionKind="click"
        popoverClassName={Classes.POPOVER2_CONTENT_SIZING}
        onInteraction={setIsOpened}
        content={(
            <div>
              <FormGroup>
                <InputGroup
                  placeholder="Бренд"
                  value={value?.brand?.contains}
                  onChange={(e) => onChange({
                    ...(value || {}),
                    brand: {
                      contains: e.target.value
                    }
                  })}
                />
              </FormGroup>
              <FormGroup>
                <InputGroup
                  placeholder="Модель"
                  value={value?.model?.contains}
                  onChange={(e) => onChange({
                    ...(value || {}),
                    model: {
                      contains: e.target.value
                    }
                  })}
                />
              </FormGroup>
              <FormGroup>
                <InputGroup
                  placeholder="Вязкость"
                  value={value?.viscosity?.contains}
                  onChange={(e) => onChange({
                    ...(value || {}),
                    viscosity: {
                      contains: e.target.value
                    }
                  })}
                />
              </FormGroup>
              {/*<div className="flex justify-between">
                <Button text="Очистить" onClick={() => onChange(null)} />
                <Button intent="primary" text="Поиск" onClick={() => onChange(null)} />
              </div>*/}
            </div>
        )}
      >
        <Button
          icon="filter"
          small
          minimal
        />
      </Popover2>
    </div>
  )
}
