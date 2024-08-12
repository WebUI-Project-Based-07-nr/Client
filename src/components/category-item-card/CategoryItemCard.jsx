import { Card, CardContent, Typography, Link, Box } from '@mui/material'
import { styles } from '~/components/category-item-card/CategoryItemCard.styles'

const CategoryItemCard = ({ link, image, title, description }) => {
  return (
    <Link href={link} sx={styles.linkContainer}>
      <Card sx={styles.container}>
        <Box
          alt='image'
          component='img'
          src={image}
          sx={styles.iconContainer}
        />
        <CardContent sx={styles.cardContainer}>
          <Typography sx={styles.title}>{title}</Typography>
          <Typography sx={styles.description}>{description}</Typography>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CategoryItemCard
