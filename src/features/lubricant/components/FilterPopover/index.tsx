import {
  Button,
  Classes,
  FormGroup,
  InputGroup,
  Popover
} from '@blueprintjs/core'
import { useState } from 'react'

export function FilterPopover({ value, onChange }) {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <div className="flex items-center">
      <div className="mr-1">
        {value?.brandEntity?.name?.contains || '-'} / {value?.model?.contains || '-'} /{' '}
        {value?.viscosity?.contains || '-'}
      </div>
      <Popover
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        isOpen={isOpened}
        placement="bottom"
        interactionKind="click"
        onInteraction={setIsOpened}
        content={
          <div>
            <FormGroup>
              <InputGroup
                placeholder="Бренд"
                value={value?.brandEntity?.name?.contains}
                onChange={(e) =>
                  onChange({
                    ...(value || {}),
                    brandEntity: {
                      name: {
                        contains: e.target.value
                      }
                    }
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <InputGroup
                placeholder="Модель"
                value={value?.model?.contains}
                onChange={(e) =>
                  onChange({
                    ...(value || {}),
                    model: {
                      contains: e.target.value
                    }
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <InputGroup
                placeholder="Вязкость"
                value={value?.viscosity?.contains}
                onChange={(e) =>
                  onChange({
                    ...(value || {}),
                    viscosity: {
                      contains: e.target.value
                    }
                  })
                }
              />
            </FormGroup>
            {/*<div className="flex justify-between">
                <Button text="Очистить" onClick={() => onChange(null)} />
                <Button intent="primary" text="Поиск" onClick={() => onChange(null)} />
              </div>*/}
          </div>
        }
      >
        <Button icon="filter" small minimal />
      </Popover>
    </div>
  )
}
