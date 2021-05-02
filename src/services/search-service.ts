/* eslint-disable class-methods-use-this */
import { client } from '.';
import { MusicCategory, Event } from '../models';

export enum SortingCriteria {
  PRICE,
  DATE,
  RATING,
  // DISTANCE,
}

export enum SortingOrder {
  ASC,
  DESC,
}

export interface SortingOptions {
  criteria: SortingCriteria;
  order: SortingOrder;
}

export interface SearchParams {
  categories?: MusicCategory[];
  query?: string;
  sortBy?: SortingOptions;
}

class SearchService {
  async search({
    categories,
    query,
    sortBy = { criteria: SortingCriteria.DATE, order: SortingOrder.DESC },
  }: SearchParams): Promise<Event[]> {
    const events = await client.getEvents();
    const filteredResults = this.filterBy(events, { categories, query });

    return filteredResults.sort((ev1, ev2) =>
      this.comparator(ev1, ev2, sortBy),
    );
  }

  // TODO: Check ASC - DESC
  private comparator(ev1: Event, ev2: Event, options: SortingOptions) {
    // if (options.criteria === SortingCriteria.DATE) {
    //   return options.order === SortingOrder.ASC
    //     ? ev1.date > ev2.date
    //     : ev1.date < ev2.date;
    // }
    if (options.criteria === SortingCriteria.PRICE) {
      return options.order === SortingOrder.ASC
        ? ev1.price - ev2.price
        : ev2.price - ev1.price;
    }
    return 1;
  }

  private filterBy(
    events: Event[],
    {
      categories,
      query,
    }: {
      categories?: MusicCategory[];
      query?: string;
    },
  ) {
    return events.filter((event) => {
      const matchesQuery = !query || event.title.toLowerCase().includes(query);
      const matchesCategory =
        !categories ||
        categories.length === 0 ||
        categories.some((searchCategory) =>
          event.musicCategories.includes(searchCategory),
        );

      return matchesQuery && matchesCategory;
    });
  }
}

export const search = new SearchService();
