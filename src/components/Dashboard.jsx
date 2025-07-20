import { useState, useMemo } from 'react';
import { Container, Row, Col, Navbar, Button, ButtonGroup } from 'react-bootstrap';
import PopularVoteChart from './PopularVoteChart';
import SeatDistributionChart from './SeatDistributionChart';
import electionData from '../data/electionData';
import translations from '../data/translations';
import '../theme/theme.css';
import theme from '../theme/theme';

function Dashboard() {
  const [lang, setLang] = useState('en');
  const [selectedYear, setSelectedYear] = useState('2025');
  const t = translations[lang];

  const toggleLanguage = () => setLang(prev => (prev === 'en' ? 'fr' : 'en'));

  const { popularVote, seatCount, majoritySeats } = useMemo(() => {
    const yearData = electionData[selectedYear];
    const partyTranslations = t.parties;
    const translateData = (data) =>
      data
        .map((party) => ({
          ...party,
          name: partyTranslations[party.name] || party.name,
        }))
        .sort((a, b) => (b.percentage || b.seats) - (a.percentage || a.seats));
    return {
      popularVote: translateData(yearData.popularVote),
      seatCount: translateData(yearData.seatCount),
      majoritySeats: Math.floor(yearData.totalSeats / 2) + 1,
    };
  }, [selectedYear, t]);

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar
        style={{
          backgroundColor: theme.cardBg,
          borderBottom: `1px solid ${theme.grey}`,
        }}
        variant="dark"
        expand="lg"
        className="shadow"
      >
        <Container>
          <Navbar.Brand className="fw-bold">
            <i className="fas fa-flag text-danger me-2" />
            {t.title}
          </Navbar.Brand>
          <Button variant="outline-light" size="sm" onClick={toggleLanguage}>
            {t.toggleLang}
          </Button>
        </Container>
      </Navbar>


      <Container className="my-5" style={{ flex: 1 }}>
        <header className="text-center mb-4">
          <h1 className="display-5 fw-bold">
            {t.subtitle.replace('{year}', selectedYear)}
          </h1>
        </header>

        <Row className="justify-content-center mb-5">
          <Col xs="auto">
            <h5 className="text-center mb-3">
              <i className="fas fa-calendar-alt me-2" />
              {t.selectYear}
            </h5>
            <ButtonGroup>
              {Object.keys(electionData)
                .sort((a, b) => b - a)
                .map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? 'danger' : 'outline-secondary'}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </Button>
                ))}
            </ButtonGroup>
          </Col>
        </Row>

        <Row>
          <Col lg={6} className="mb-4">
            <PopularVoteChart
              data={popularVote}
              title={t.voteTitle}
              subtitle={t.voteSubtitle}
              label={t.voteLabel}
            />
          </Col>
          <Col lg={6} className="mb-4">
            <SeatDistributionChart
              data={seatCount}
              title={t.seatsTitle}
              subtitle={t.seatsSubtitle.replace('{majority}', majoritySeats)}
            />
          </Col>
        </Row>
      </Container>

      <footer className="py-4 mt-5" style={{ backgroundColor: theme.cardBg,borderTop: `1px solid ${theme.grey}`,}}>
        <Container className="text-center">
          <p className="mb-0 text-muted">{t.footer}</p>
        </Container>
      </footer>
    </div>
  );
}

export default Dashboard;
