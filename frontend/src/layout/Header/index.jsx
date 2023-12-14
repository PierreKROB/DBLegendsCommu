import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { StyledLink } from '../../utils/style/Atoms'
import vegeto from '../../assets/vegeto.svg'
import ToggleColorMode from "../../components/ToggleColorMode";

const HomeLogo = styled.img`
  height: 70px;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

function Header() {
  return (
    <NavContainer>
      <Link to="/">
        <HomeLogo src={vegeto} />
      </Link>
      <div>
        <StyledLink to="/">Accueil</StyledLink>
      </div>
      <ToggleColorMode />
    </NavContainer>
  )
}

export default Header
