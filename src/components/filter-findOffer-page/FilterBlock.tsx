import { Box } from '@mui/material'
import PriceSlider from './filter-block-components/price-slider/PriceSlider'
import RatingRadioGroup from './filter-block-components/rating/RatingRadioGroup'
import InputFindByName from './filter-block-components/input-find-by-name/InputFindByName'
import AppButton from '../app-button/AppButton'
import { ButtonVariantEnum, SizeEnum } from '~/types'
import { styles } from './FilterBlock.styles'
import LanguageFilter from './filter-block-components/language-filter/LanguageFilter'
import CheckboxGroup from './filter-block-components/checkbox-group/CheckBoxGroup'
export default function FilterBlock() {
  return (
    <Box>
      <CheckboxGroup />
      <LanguageFilter />
      <PriceSlider />
      <RatingRadioGroup />
      <InputFindByName />
      <Box sx={styles.buttonsWrapper}>
        <AppButton
          size={SizeEnum.ExtraLarge}
          sx={styles.button}
          variant={ButtonVariantEnum.ContainedLight}
        >
          Apply Filters
        </AppButton>
        <AppButton
          size={SizeEnum.ExtraLarge}
          sx={styles.button}
          variant={ButtonVariantEnum.Tonal}
        >
          Clear Filters
        </AppButton>
      </Box>
    </Box>
  )
}
