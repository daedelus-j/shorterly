class Choices(object):
    '''
    Turns a single list into an iterator of tuples with same
    key and value. Django model fields expect 'choices' to be
    tuple but we find ourselves using the same key and value
    for those tuples so we made this as a shortcut.
    '''
    def __init__(self, *choices):
        self.choices = choices

    def __getitem__(self, key):
        try:
            choice = self.choices[key]
        except KeyError:
            if key in self.choices:
                choice = key
            else:
                raise KeyError(key)
        return (choice, str(choice))

    '''
    This method really shouldn't be used
    '''
    def __setitem__(self, key, value):
        if key != value:
            raise KeyValueMismatchError(key, value)
        elif value in self.choices:
            raise DuplicateChoiceError(value)
        self.choices.append(value)

    '''
    Neither should this one.
    '''
    def __delitem__(self, key):
        try:
            self.choices.remove(key)
        except ValueError:
            # Not in list.
            pass

    def __iter__(self):
        for choice in self.choices:
            yield (choice, choice)

    def __str__(self):
        return str(self.choices)

    def __len__(self):
        return len(self.choices)

    def __reversed__(self):
        return reversed(self)

    def __contains__(self, choice):
        return choice in self.choices
