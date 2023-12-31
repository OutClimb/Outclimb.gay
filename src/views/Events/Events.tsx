import './Events.scss'
import Card from 'components/Card/Card'
import DateUtil from 'utils/date.utils'
import EventResponse from 'types/EventResponse'
import Header from 'components/Header/Header'
import Hero from 'components/Hero/Hero'
import { HeroType } from 'types/HeroType'
import PageContent from 'components/PageContent/PageContent'
import useDocumentTitle from 'hooks/useDocumentTitle'
import useEventStore from 'stores/useEventStore'

function Events() {
    useDocumentTitle('Events | OutClimb')

    const { GetUpcomingEvents } = useEventStore()
    const { error, events, status } = GetUpcomingEvents()

    const getEventDescription = (event: EventResponse) => {
        const startDate = new Date(event.startTime)
        const formattedStartDate = DateUtil.formatShortDate(startDate)
        const formattedStart = `${formattedStartDate} • ${DateUtil.formatLongTime(startDate)}`

        if (event.endTime !== 0) {
            const endDate = new Date(event.endTime)
            const formattedEndDate = DateUtil.formatShortDate(endDate)
            const formattedEndTime = DateUtil.formatLongTime(endDate)

            if (formattedStartDate === formattedEndDate) {
                return `${formattedStart} - ${formattedEndTime}`
            } else {
                return `${formattedStart} - ${formattedEndDate} • ${formattedEndTime}`
            }
        }

        return formattedStart
    }

    return (
        <>
            <Header />
            <Hero image="/assets/images/events.webp" image2x="/assets/images/events-2x.webp" type={HeroType.Short} />

            <PageContent title="Upcoming Events">
                {status === 'loading' && <p>Loading</p>}
                {status === 'error' && error != null && <h2>{error.toString()}</h2>}
                {status === 'success' && events && (
                    <div className="events">
                        {events.map((event) => (
                            <Card
                                description={getEventDescription(event)}
                                to={`/events/${event.slug}`}
                                image={event.smallImage || event.image}
                                image2x={event.smallImage2x || event.image2x}
                                imageAlt={event.imageAlt}
                                key={event.slug}
                                title={event.name}
                            />
                        ))}
                    </div>
                )}
            </PageContent>
        </>
    )
}

export default Events
