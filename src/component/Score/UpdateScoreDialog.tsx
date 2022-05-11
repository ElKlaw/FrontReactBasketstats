import CustomizedDialogs from "component/Dialog"
import { FormulaireScore } from "pages/Formulaire/FormulaireScore"

interface Props {
  open: boolean
  setOpen: (value: boolean) => void
  initialValue: any
  validate: (value: boolean) => void
}

export function UpdateScoreDialog({open, setOpen, initialValue, validate} : Props) {

  return (
    <CustomizedDialogs 
      handleClose={()=> setOpen(false)} 
      isOpen={open}
      title={
          <span>Ajouter un score</span>
      }
      content={
          <FormulaireScore 
              onClose={()=> {
                setOpen(false)
              }}
              initialValues={initialValue}
              validate={res => {
                validate(res ? true : false)
              }}
          />
      }
    />
  )
}