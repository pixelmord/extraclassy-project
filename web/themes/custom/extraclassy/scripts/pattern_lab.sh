#!/bin/bash
# Install Pattern Lab

# Remove existing PL directory
rm -rf pattern-lab

# Install PL
composer create-project -n pattern-lab/edition-twig-standard pattern-lab

# Delete the default patterns and twig-components directories
rm -rf pattern-lab/source/_patterns
rm -rf pattern-lab/source/_twig-components

# Symlink our components and twig components directories to the source locations we just deleted
ln -s ../source/components pattern-lab/source/_patterns
ln -s ../source/_twig-components pattern-lab/source/_twig-components
