#!/bin/bash

wd=$(pwd)
sudo apt-get update && sudo apt-get -y install xz-utils make
sudo curl -s -o /var/tmp/zig.tar.xz https://ziglang.org/builds/zig-linux-aarch64-0.12.0-dev.2059+42389cb9c.tar.xz && \
    sudo mkdir -p /usr/local/bin/zig && \
    sudo tar Jxfv /var/tmp/zig.tar.xz -C /usr/local/bin --strip-components 1 && \
    rm -rf /var/tmp/zig.tar.xz
git -C /var/tmp clone https://github.com/zigtools/zls && \
    cd /var/tmp/zls && \
    zig build -Doptimize=ReleaseSafe && \
    sudo cp zig-out/bin/zls /usr/local/bin && \
    rm -rf /var/tmp/zls
cd ${wd}