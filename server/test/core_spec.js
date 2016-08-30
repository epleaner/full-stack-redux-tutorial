/**
 * Created by pivotal on 8/29/16.
 */

import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe ('application logic', () => {
    describe('setEntries', () => {

        it('adds the entries to the state', () => {
            const state = Map();
            const entries = List.of('Trainspotting', '28 Days Later');

            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });

        it('converts to immutable', () => {
            const state = Map();
            const entries = ['Trainspotting', '28 Days Later'];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }));
        });
    });

    describe('next', () => {
        it('takes the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });

        it('puts the winner of current vote back into entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Tsp', '28'),
                    tally: Map({
                        'Tsp': 4,
                        '28': 2
                    })
                }),
                entries: List.of('S', 'M', '127')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('S', 'M')
                }),
                entries: List.of('127', 'Tsp')
            }));
        });

        it('puts both from tied vote back to entries', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Tsp', '28'),
                    tally: Map({
                        'Tsp': 3,
                        '28': 3
                    })
                }),
                entries: List.of('S', 'M', '127')
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map({
                    pair: List.of('S', 'M')
                }),
                entries: List.of('127', 'Tsp', '28')
            }));
        });

        it('marks winner when just one entry left', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Tsp', '28'),
                    tally: Map({
                        'Tsp': 4,
                        '28': 2
                    })
                }),
                entries: List()
            });

            const nextState = next(state);

            expect(nextState).to.equal(Map({
                winner: 'Tsp'
            }));
        });
    });

    describe('vote', () => {
        it('creates a tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later')
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 1
                })
            }));
        });

        it('adds to existing tally for the voted entry', () => {
            const state = Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 3,
                    '28 Days Later': 2
                })
            });

            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(Map({
                pair: List.of('Trainspotting', '28 Days Later'),
                tally: Map({
                    'Trainspotting': 4,
                    '28 Days Later': 2
                })
            }));
        });
    });
});